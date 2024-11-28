import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import {UserProvider} from "./contexts/UserContext.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {CentrifugoProvider} from "./contexts/CentrifugoContext.jsx";
import {ModalProvider} from "./contexts/ModalContext.jsx";
import {ThemeProvider} from "./contexts/ThemeContext.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider>
            <HashRouter>
                <CentrifugoProvider>
                    <App />
                </CentrifugoProvider>
            </HashRouter>
        </ThemeProvider>
    </Provider>
)