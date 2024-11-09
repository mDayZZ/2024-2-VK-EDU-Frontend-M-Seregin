import {useEffect, useMemo, useState} from 'react'
import './App.scss'
import {getUserById} from "./services/userService.js";
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import ChatPage from "./components/pages/ChatPage/ChatPage.jsx";
import {Route, Routes} from "react-router-dom";
import {ModalProvider} from "./contexts/ModalContext.jsx";
import {UserProvider, useUserContext} from "./contexts/UserContext.jsx";
import {routes} from "./utils/routes.js";

function App() {
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState('conversationsPage');
    const [lastChatId, setLastChatId] = useState(null);

    const {user, setUser} = useUserContext();

    const fetchUserInfo = async (userId) => {
        const userInfo = await getUserById(userId);
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



  return (
          <ThemeProvider>
              <ModalProvider>
                  <div id={'app'}>
                      {
                          user &&
                          <Routes>
                              <Route path={routes.chats} element={<ConversationsPage/>}/>
                              <Route path={routes.chat(':id')} element={<ChatPage/>}/>
                          </Routes>
                      }

                      <h1 className={'visually-hidden'}>DayZZChat</h1>
                  </div>
              </ModalProvider>
          </ThemeProvider>
  )
}

export default App
