import {useEffect, useMemo, useState} from 'react'
import './App.scss'
import {getUserById} from "./services/userService.js";
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import ChatPage from "./components/pages/ChatPage/ChatPage.jsx";

function App() {
    const [userId, setUserId] = useState(2);
    const [userInfo, setUserInfo] = useState({});
    const [currentPage, setCurrentPage] = useState('conversationsPage')
    const [lastChatId, setLastChatId] = useState(null);

    const fetchUserInfo = async () => {
        const userInfo = await getUserById(userId);
        setUserInfo(userInfo);
    }


    useEffect(() => {
        fetchUserInfo();
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
                return <ConversationsPage userId={userId} openChatPage={openChatPage}/>
            case 'chatPage':
                return <ChatPage userInfo={userInfo} chatId={lastChatId} openConversationsPage={openConversationsPage}/>
        }
    };



  return (
      <ThemeProvider>
          <div id={'app'} >
              <h1 className={'visually-hidden'}>DayZZChat</h1>
              {renderPage()}
          </div>
      </ThemeProvider>

  )
}

export default App
