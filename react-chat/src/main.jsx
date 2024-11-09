import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext.jsx";

createRoot(document.getElementById('root')).render(
    <HashRouter>
        <UserProvider>
            <App />
        </UserProvider>

    </HashRouter>
)