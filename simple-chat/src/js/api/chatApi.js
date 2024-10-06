import { users, chats } from './mockData';

export const getChatById = async (id) => {
   try {
       await new Promise(resolve => setTimeout(resolve, 40));
       const chat = chats.find(chat => String(chat.id) === String(id));
       if (!chat) {
           return null;
       }
       return chat;
   } catch(error) {
       console.error(`Ошибка при получении чата по id: ${error.message}`)
       throw error;
   }
}

export const postMessageByChatId = async ({messageId, senderId, messageText, datetime}, chatId) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    try {
        const chat = chats.find(chat => String(chat.id) === String(chatId));
        if (!chat) {
            return null;
        }
        const message = {id: messageId, senderId, messageText, datetime};
        chat.messages.push(message);
    } catch (error) {
        console.error(`Ошибка отправления сообщения: ${error.message}`)
        throw error;
    }

}


// export const postMessageByChatId = ({messageId, senderId, messageText, datetime}, chatId) => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const chat = chats.find(chat => Number(chat.id) === Number(chatId))
//
//             if (!chat) {
//                 reject(null);
//             }
//             const message = {id: messageId, senderId, messageText, datetime};
//             chat.messages.push(message);
//
//             resolve(chat);
//         }, 30);
//     });
//     return promise;
// }
