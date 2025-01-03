import {useEffect} from 'react'
import './App.scss'
import ConversationsPage from "./components/pages/ConversationsPage/ConversationsPage.jsx";
import ChatPage from "./components/pages/ChatPage/ChatPage.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {ModalProvider} from "./contexts/ModalContext.jsx";
import {routes} from "./utils/routes.js";
import AuthPage from "./components/pages/AuthPage/AuthPage.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "./store/auth/authSelectors.js";
import {fetchUserData} from "./store/auth/authThunks.js";
import {useCheckNotificationPermissions} from "./hooks/useCheckNotificationPermissions.js";
import NotificationPermissions from "./components/NotificationPermissions/NotificationPermissions.jsx";

function App() {
    const dispatch = useDispatch();
    const {isAuthorized, loading} = useSelector(authSelector);


    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch])


  return (
      !loading &&
              <ModalProvider>
                  <div id={'app'}>
                      <NotificationPermissions isAuthorized={isAuthorized}/>
                      <h1 className={'visually-hidden'}>Chatix Messenger</h1>
                      {!loading &&
                          <Routes>
                              <Route path='/' element={<Navigate to={routes.chats} />} />
                              <Route path={routes.auth} element={isAuthorized ? <Navigate to='/' /> : <AuthPage/> }/>
                              <Route path={routes.chats} element={<PrivateRoute><ConversationsPage/></PrivateRoute>}/>
                              <Route path={routes.chat(':chatId')} element={<ChatPage/>}/>
                          </Routes>
                      }
                  </div>
              </ModalProvider>
  )
}

export default App
