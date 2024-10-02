import './styles/index.scss';
import {createChatActivity} from "./js/pages/chatActivity";
import {createConversationActivity} from "./js/pages/conversationActivity";

const root = document.getElementById('root');
const App = document.createElement('div');
App.id = 'App';

let state = 'conversations';
let userId = 31;

let chatId = null;


const updateApp = () => {
    App.innerHTML = '';

    switch (state) {
        case "chat":
            App.appendChild(createChatActivity({userId: userId, chatId: chatId}));
            break;
        case "conversations":
            App.appendChild(createConversationActivity({userId: userId}))
            break;
    }

    root.appendChild(App);
}

window.updateState = (newState, params = {}) => {
    state = newState;

    if (newState === 'chat') {
        chatId = params.chatId;
    }
    updateApp();
}

window.addEventListener('storage', (event) => {
    if (event.key === 'chats') {
        const updatedChats = JSON.parse(event.newValue);
    }
});

updateApp();




