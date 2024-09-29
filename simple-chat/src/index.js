
// import {getChatById, getUserById} from "./js/api";
// import {createMessageElement} from "./js/utils/createElements";
// import {getDatetime} from "./js/utils/date";
// import {none} from "html-webpack-plugin/lib/chunksorter";
//
// const loader = document.querySelector('.loader');
// const main = document.querySelector('main');
// const form = document.querySelector('form');
// const input = document.querySelector('.chatForm__input');
// const chatContainer = document.querySelector('.chatContainer');
// const chatTitle = document.getElementById('chatTitle');
// const chatAvatar = document.getElementById('chatAvatar');
// const chatStatus = document.getElementById('chatStatus');
//
// let userInfo = null;
// let chatInfo = null;
// let memberInfo = null;
//
//
// const renderMessage = ({id, senderId, messageText, datetime}) => {
//     const senderInfo = memberInfo.find(member => member.id === senderId);
//     const isSelf = senderInfo?.id === userInfo.id;
//     const formattedDatetime = getDatetime(datetime);
//     return createMessageElement({senderId, senderInfo, id, isSelf, messageText, datetime: formattedDatetime});
// }
//
// const updateMessages = () => {
//     if (chatInfo) {
//         chatContainer.innerHTML = '';
//         let messagesFragment = new DocumentFragment();
//
//         chatInfo.messages.forEach(message => {
//             messagesFragment.append(renderMessage(message));
//         })
//         chatContainer.appendChild(messagesFragment);
//         main.scrollTop = main.scrollHeight;
//     }
// }
//
// const sendMessage = (message) => {
//     if (chatInfo && userInfo) {
//         const messageId = Math.floor(Math.random() * (100000 - 1)) + 1;
//         const datetime = new Date().toISOString();
//         const newMessage = {id: messageId, senderId: userInfo.id, messageText: message, datetime: datetime}
//         chatInfo.messages.push(newMessage);
//         chatContainer.insertAdjacentElement('beforeend', renderMessage(newMessage))
//         localStorage.setItem('messages', JSON.stringify(chatInfo.messages))
//         main.scrollTop = main.scrollHeight;
//     }
// }
//
//
// const updateChatInfo = () => {
//     if (!chatInfo) {
//         return;
//     }
//     chatTitle.innerText = chatInfo.title;
//     chatAvatar.src = chatInfo.avatarUrl;
//     if (chatInfo.isPublic) {
//         chatStatus.innerText = `${chatInfo.members.length} участников`;
//     }
// }
//
// const handleSubmit = (event) => {
//     event.preventDefault();
//     sendMessage(input.value);
//     input.value = '';
// }
//
//
//
//
// (async () => {
//     [userInfo, chatInfo] = await Promise.all([
//         getUserById(24),
//         getChatById(1),
//     ]);
//     const memberInfoPromises = chatInfo.members.map(member => getUserById(member.id));
//     memberInfo = await Promise.all(memberInfoPromises);
//     if (!userInfo && !chatInfo) {
//         return;
//     }
//
//     const messagesFromStorage = JSON.parse(localStorage.getItem('messages'));
//     if (messagesFromStorage) {
//         chatInfo.messages = messagesFromStorage;
//     }
//     updateChatInfo();
//     updateMessages();
//
//     form.addEventListener('submit', handleSubmit);
// })();
//


import './styles/index.scss';
import {createChatActivity} from "./js/pages/chatActivity";

const root = document.getElementById('root');
const App = document.createElement('div');
App.id = 'App';

const state = 'chat';


const updateActivity = () => {
    root.innerHTML = '';
    switch (state) {
        case "chat":
            App.appendChild(createChatActivity({userId: 24, chatId: 1}));
            break;
    }

    root.appendChild(App);
}

updateActivity()




