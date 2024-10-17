import {useEffect, useMemo, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {getUserById} from "./services/userService.js";
import {getChatsByUserId, getMessagesByChatId} from "./services/chatService.js";
import DefaultHeader from "./components/UI/DefaultHeader/DefaultHeader.jsx";
import ConversationsHeader from "./components/ConversationsHeader/ConversationsHeader.jsx";
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import {ThemeContext} from "@emotion/react";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";

function App() {
    const [userId, setUserId] = useState(5);
    const [userInfo, setUserInfo] = useState({});
    const [currentPage, setCurrentPage] = useState('chatlist')
    const [messages, setMessages] = useState([]);
    const fetchUserInfo = async () => {
        const userInfo = await getUserById(userId);
        setUserInfo(userInfo);
    }


    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessagesByChatId(chatId);
        setMessages(fetchedMessages);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [userId]);


    useEffect(() => {
        fetchMessages(4);
    }, [])

    const renderPage = useMemo(() => {
        switch (currentPage) {
            case 'chatlist':
                return <ConversationsPage userId={userId}/>
        }
    }, [currentPage])

  return (
      <ThemeProvider>
          <div id={'app'} >
              <h1 className={'visually-hidden'}>DayZZChat</h1>
              {renderPage}
          {/*    <p>{userInfo.username}</p>*/}

          {/*    <h1>Пикми тачёные</h1>*/}
          {/*    {messages.map(message => <p>{message.content}</p>)}*/}

          </div>
      </ThemeProvider>

  )
}

export default App
