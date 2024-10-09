export const getChatsFromLocalStorage = () => {
    try {
        const chatsFromLocalStorage = JSON.parse(localStorage.getItem('chats'));
        if (!chatsFromLocalStorage) {
            return []
        }
        return chatsFromLocalStorage;

    } catch (error) {
        console.error(`Ошибка получения чатов из локального хранилища: ${error.message}`)
    }
}

export const saveChatsToLocalStorage = (chats) => {
    try {
        const jsonChats = JSON.stringify(chats);
        localStorage.setItem('chats', jsonChats);
    } catch (error) {
        console.error(`Ошибка сохранения чатов в локальное хранилище: ${error.message}`)
    }
}

export const getChatInfoFromLocalStorage = (id) => {
    try {
        const chatsFromLocalStorage = getChatsFromLocalStorage();
        const chatInfo = chatsFromLocalStorage.find(chat => Number(chat.id) === Number(id));
        if (!chatInfo) {
            return null;
        }
        return chatInfo;
    } catch (error) {
        console.error(`Ошибка при получении информации о чате из локального хранилища: ${error.message}`);
    }

}

export const saveMessageToChatInLocalStorage = (newMessage, chatId) => {
    const chatsFromLocal = getChatsFromLocalStorage();
    const chatIndex = chatsFromLocal.findIndex(chat => Number(chat.id) === Number(chatId));

    if (chatIndex !== -1) {
        chatsFromLocal[chatIndex].messages.push(newMessage);
        saveChatsToLocalStorage(chatsFromLocal);
    }

};