import {getUserVisibleName} from "../utils/getUserVisibleName.js";
import {pluralize} from "../utils/pluralize.js";
import {chatService} from "./api/chatService.js";

export const notificationApiService = {
    notify: async (message) => {
        if (!('Notification' in window)) {
            return;
        }
        if (Notification.permission === 'granted') {
            const {sender, text, chat: chatId, voice, files} = message;
            console.log(message)
            const chat = await chatService.getChatInfo(chatId);
            const { title: chatTitle, avatar: chatAvatar } = chat;
            const {avatar: senderAvatar} = sender;
            const visibleName = getUserVisibleName(sender);

            const getVisibleText = () => {
                if (voice) {
                    return `Голосовое сообщение`;
                }
                let filesString = '';
                if (files.length > 0) {
                    filesString = `[${pluralize(files.length, 'файл', 'файла', 'файлов')}]`;
                }
                return `${filesString} ${text}`;
            }

            const visibleText = getVisibleText();
            const body = `${visibleName}: ${visibleText}`;
            const visibleImg = chatAvatar || senderAvatar || `${import.meta.env.BASE_URL}/images/avatars/default_avatar.png`;
            const notification = new Notification(chatTitle, {body, icon: visibleImg });

            notification.onclick = () => {
                window.open(`${import.meta.env.BASE_URL}#/chats/${chatId}`, '_blank');
            };
        }
    }
}