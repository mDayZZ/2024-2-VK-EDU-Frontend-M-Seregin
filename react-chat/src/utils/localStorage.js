const LOCAL_STORAGE_KEY = 'messenger';


const changeLastMessage = (message, chatId, userId) => {
    const loadedChats = loadChatsFromLocalStorage(userId);
    const loadedChat = loadedChats.find(chat => chat.id === chatId);
    const changedChat = {...loadedChat, last_message: message};
    const changedChats = loadedChats.map(chat => {
        if (chat.id === changedChat.id) {
            return changedChat;
        }
    return chat;
    })

    saveChatsToLocalStorage(changedChats, userId);
}

export const loadChatsFromLocalStorage = (userId) => {
    const data = localStorage.getItem(`${LOCAL_STORAGE_KEY}_chats_${userId}`);
    return data ? JSON.parse(data) : null;
};

export const saveChatsToLocalStorage = (chats, userId) => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_chats_${userId}`, JSON.stringify(chats));
};


export const loadMessagesFromLocalStorage = (chatId) => {
    const data = localStorage.getItem(`${LOCAL_STORAGE_KEY}_messages_${chatId}`);
    return data ? JSON.parse(data) : null;
};

export const saveMessageToLocalStorage = (message, chatId, userId) => {
    const loadedMessages = loadMessagesFromLocalStorage(chatId);
    const newMessages = [...loadedMessages, message]
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_messages_${chatId}`, JSON.stringify(newMessages));
    changeLastMessage(message, chatId, userId);
};

export const saveMessagesToLocalStorage = (messages, chatId) => {
    const loadedMessages = loadMessagesFromLocalStorage(chatId);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_messages_${chatId}`, JSON.stringify(messages));
};

