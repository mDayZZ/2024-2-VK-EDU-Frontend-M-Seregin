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
import AuthPage from "./components/pages/AuthPage/AuthPage.jsx";
import {userApi} from "./services/api/user/index.js";
import {useAuth} from "./contexts/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";

function App() {
    const {user, isAuthenticated, login, logout, isLoading} = useAuth();


  return (
          <ThemeProvider>
              <ModalProvider>
                  <div id={'app'}>
                      {!isLoading &&
                          <Routes>
                              <Route path={routes.auth} element={<AuthPage/>}/>
                              <Route path={routes.chats} element={<PrivateRoute><ConversationsPage/></PrivateRoute>}/>
                              <Route path={routes.chat(':chatId')} element={<ChatPage/>}/>
                          </Routes>
                      }

                      <h1 className={'visually-hidden'}>DayZZChat</h1>
                  </div>
              </ModalProvider>
          </ThemeProvider>
  )
}

export default App
