import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {CentrifugoProvider} from "./contexts/CentrifugoContext.jsx";
import {ModalProvider} from "./contexts/ModalContext.jsx";

createRoot(document.getElementById('root')).render(
    <HashRouter>
        <AuthProvider>
            <CentrifugoProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </CentrifugoProvider>
        </AuthProvider>

    </HashRouter>
)