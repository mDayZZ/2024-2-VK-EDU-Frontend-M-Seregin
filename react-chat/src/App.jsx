import {useEffect, useMemo, useState} from 'react'
import './App.scss'
import {getUserById} from "./services/userService.js";
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import ChatPage from "./components/pages/ChatPage/ChatPage.jsx";
import {Route, Routes} from "react-router-dom";
import {ModalProvider} from "./contexts/ModalContext.jsx";
import {UserProvider, useUserContext} from "./contexts/UserContext.jsx";

function App() {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState('conversationsPage');
    const [lastChatId, setLastChatId] = useState(null);

    const {user, setUser} = useUserContext();

    const fetchUserInfo = async (userId) => {
        console.log(userId)
        const userInfo = await getUserById(userId);
        console.log('ui', userInfo)
        setUser(userInfo);
    }

    useEffect(() => {
        setUserId(2);
    }, [])

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchUserInfo(userId);
    }, [userId]);


    const openChatPage = (chatId) =>{
        setLastChatId(chatId);
        setCurrentPage('chatPage');
    }

    const openConversationsPage = () => {
        setCurrentPage('conversationsPage');
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'conversationsPage':
                return <ConversationsPage />
            case 'chatPage':
                return <ChatPage />
        }
    };

    console.log(user)


  return (
          <ThemeProvider>
              <ModalProvider>
                  <div id={'app'}>
                      {
                          user &&
                          <Routes>
                              <Route path="/chats" element={<ConversationsPage/>}/>
                              <Route path="/chats/:id" element={<ChatPage/>}/>
                          </Routes>
                      }

                      <h1 className={'visually-hidden'}>DayZZChat</h1>
                  </div>
              </ModalProvider>
          </ThemeProvider>
  )
}

export default App
