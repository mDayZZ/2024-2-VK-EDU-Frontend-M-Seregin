import './styles/index.scss';
import {getChatById, getUserById} from "./js/api";
import {createMessageElement} from "./js/utils/createElements";
import {getDatetime} from "./js/utils/date";


const main = document.querySelector('main');
const form = document.querySelector('form');
const input = document.querySelector('.chatForm__input');
const chatContainer = document.querySelector('.chatContainer');

const chatTitle = document.getElementById('chatTitle');
const chatAvatar = document.getElementById('chatAvatar');
const chatStatus = document.getElementById('chatStatus');

const userInfo = JSON.parse(getUserById(24));

const chatInfo = JSON.parse(getChatById(1));




const updateMessages = () => {
    chatContainer.innerHTML = '';
    chatInfo.messages.forEach(message => {
        let senderInfo = JSON.parse(getUserById(message.senderId));
        const isSelf = senderInfo.id === userInfo.id;
        const datetime = getDatetime(message.datetime);
        chatContainer.insertAdjacentElement("beforeend", createMessageElement(senderInfo, isSelf, message.messageText, datetime))
    })
    main.scrollTop = main.scrollHeight;

    localStorage.setItem('messages', JSON.stringify(chatInfo.messages))
}

const sendMessage = (message) => {
    const messageId = Math.floor(Math.random() * (100000 - 1)) + 1;
    const datetime = new Date().toISOString();
    const newMessage = {id: messageId, senderId: userInfo.id, messageText: message, datetime: datetime}
    chatInfo.messages.push(newMessage);
    updateMessages();
}


const updateChatInfo = () => {
    chatTitle.innerText = chatInfo.title;
    chatAvatar.src = chatInfo.avatarUrl;
    if (chatInfo.isPublic) {
        chatStatus.innerText = `${chatInfo.users.length} участников`;
    }
}





document.addEventListener('DOMContentLoaded', () => {
    const messagesFromStorage = JSON.parse(localStorage.getItem('messages'));
    if (messagesFromStorage) {
        chatInfo.messages = messagesFromStorage;
    }

    updateChatInfo();
    updateMessages();

})

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
    event.preventDefault();
    sendMessage(input.value);
    input.value = '';
}