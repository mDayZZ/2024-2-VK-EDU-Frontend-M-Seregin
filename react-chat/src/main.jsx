import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import {CentrifugoProvider} from "./contexts/CentrifugoContext.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <HashRouter>
            <CentrifugoProvider>
                <App />
            </CentrifugoProvider>
        </HashRouter>
    </Provider>
)