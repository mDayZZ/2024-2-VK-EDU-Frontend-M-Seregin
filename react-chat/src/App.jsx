import {useEffect, useMemo, useState} from 'react'
import './App.scss'
import {getUserById} from "./services/userService.js";
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import ChatPage from "./components/pages/ChatPage/ChatPage.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState('conversationsPage');
    const [lastChatId, setLastChatId] = useState(null);

    const fetchUserInfo = async (userId) => {
        const userInfo = await getUserById(userId);
        setUserInfo(userInfo);
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



  return (
      <ThemeProvider>
          <div id={'app'} >
              <Routes>
                  <Route path="/chats" element={<ConversationsPage userId={userId} openChatPage={openChatPage}/>} />
                  <Route path="/chats/:id" element={<ChatPage userInfo={userInfo} openConversationsPage={openConversationsPage}/>} />
              </Routes>
              <h1 className={'visually-hidden'}>DayZZChat</h1>
          </div>
      </ThemeProvider>

  )
}

export default App
