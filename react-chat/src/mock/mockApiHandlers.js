import {mockedUsers} from "./users.js";
import {mockedChatMembers} from "./chat_members.js";
import {mockedChats} from "./chats.js";
import {mockedMessages} from "./messages.js";
import {pluralize} from "../utils/pluralize.js";
import {
    getItemFromLocalStorage,
    initToLocalStorage,
    pushToLocalStorage,
    saveItemToLocalStorage
} from "../utils/localStorage.js";


const initLocalStorage = () => {
    initToLocalStorage('chats', mockedChats);
    initToLocalStorage('messages', mockedMessages);
    initToLocalStorage('users', mockedUsers);
    initToLocalStorage('chatMembers', mockedChatMembers);
}


const getUsers = () => {
    let users = mockedUsers;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        users = getItemFromLocalStorage('users');
    }
    return users;
}

const getMessages = () => {
    let messages = mockedMessages;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        messages = getItemFromLocalStorage('messages');
    }
    return messages;
}

const getChatMembers = () => {
    let chatMembers = mockedChatMembers;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        chatMembers = getItemFromLocalStorage('chatMembers');
    }
    return chatMembers;
}

const getChats = () => {
    let chats = mockedChats;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        chats = getItemFromLocalStorage('chats');
    }
    return chats;
}

const getUserById = (userId) => {
    if (!userId) {
        throw new Error("userId is required in getUserById");
    }
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        const users = getItemFromLocalStorage('users');
        return users.find(user => user.id === userId);
    }
    return mockedUsers.find(user => user.id === userId);
};


const getUserChatsId = (userId) => {
    if (!userId) {
        throw new Error('userId needed in getUserChatsId');
    }
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        const chatsId = getItemFromLocalStorage('chatMembers');

        return chatsId.filter(chatMember => chatMember.user_id === userId)
            .map(chatMember => chatMember.chat_id);
    }

    const chatsId = mockedChatMembers
        .filter(chatMember => chatMember.user_id === userId)
        .map(chatMember => chatMember.chat_id);

    return chatsId;
};

const getChatsLastMessages = (chatsId) => {
    if (!Array.isArray(chatsId)) {
        throw new Error('chatId must be an array in chatsLastMessage');
    }
    const lastMessages = chatsId.map((chatId) => {
        let messages = mockedMessages;
        if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
            messages = getItemFromLocalStorage('messages');
        }
        const chatMessages = messages.filter(message => message.chat_id === chatId);

        const lastMessage = chatMessages.reduce((lastMessage, chatMessage) => {
            if (!lastMessage || new Date(lastMessage.created_at) < new Date(chatMessage.created_at)) {
                lastMessage = chatMessage;
            }
            return lastMessage;
        })
        return lastMessage;
    })

    const resultLastMessages = lastMessages.map(lastMessage => {
        const userInfo = getUserById(lastMessage.sender_id);
        return {...lastMessage, user: userInfo};
    })

    return resultLastMessages;
};

export const mockedGetUserById = async (userId) => {
    try {
        if (typeof userId !== 'number') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        const userInfo = getUserById(userId);
        return userInfo;

    } catch (error) {
        throw error;
    }
}


export const mockedChangeUserInfo = async (userInfo, userId) => {
    try {
        if (typeof userId !== 'number' && typeof userInfo !== 'object') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 300));
         const users = getUsers();
         const changedUsers = users.map(user => {
             if (user.id === userId) {
                 return userInfo
             }
             return user
         })
        saveItemToLocalStorage('users', changedUsers);

        return changedUsers;

    } catch (error) {
        throw error;
    }
}

const getPartnerChatMember = (chatId, userId) => {
    let chatMembers = mockedChatMembers;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        getItemFromLocalStorage('chatMembers');
    }
    return chatMembers
        .filter(chatMember => chatMember.chat_id === chatId)
        .find(chatMember => chatMember.user_id !== userId)
};
export const mockedGetChatsByUserId = async (userId) => {
    // GET /api/chats/
    try {
        if (typeof userId !== 'number') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        const chatsId = getUserChatsId(userId);
        let userChats = mockedChats.filter(chat => chatsId.includes(chat.id));
        if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
            userChats = getItemFromLocalStorage('chats').filter(chat => chatsId.includes(chat.id));
        }
        const chatsLastMessages = getChatsLastMessages(chatsId);

        const resultChats = userChats.map(userChat => {
            if (!userChat.is_group) {
                const partnerChatMember = getPartnerChatMember(userChat.id, userId);
                const partnerUserInfo = getUserById(partnerChatMember.user_id);
                userChat.name = partnerUserInfo.name || partnerUserInfo.username;
                userChat.chat_image_url = partnerUserInfo.profile_image_url;
            }
            const chatLastMessage = chatsLastMessages.find(lastMessage => lastMessage.chat_id === userChat.id)
            return {...userChat, last_message: chatLastMessage};
        })

        return resultChats;

    } catch (error) {
        throw error;
    }
};


export const mockedGetMessagesByChatId = async (chatId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('chatId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 300)); // Симуляция задержки
        let messages = mockedMessages;
        let users = mockedUsers;
        if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
            messages = getItemFromLocalStorage('messages');
            users = getItemFromLocalStorage('users');
        }
        const chatMessages = messages.filter(message => message.chat_id === chatId);

        const enrichedMessages = chatMessages.map(message => {
            const sender = users.find(user => user.id === message.sender_id);
            return {
                ...message,
                sender_name: sender?.name || sender?.username,
                sender_username: sender?.username || 'Unknown',
                sender_profile_image_url: sender?.profile_image_url || '',
            };
        });

        return enrichedMessages;

    } catch (error) {
        throw error;
    }
};

const getMockedChatMembers = (chatId) => {
    let chatMembers = mockedChatMembers;
    let users = mockedUsers;
    if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
        chatMembers = getItemFromLocalStorage('chatMembers');
        users = getItemFromLocalStorage('users');
    }


    const members = chatMembers.filter(chatMember => chatMember.chat_id === chatId);
    const membersUserInfo = members.map(member => users.find(user => user.id === member.id));


    return membersUserInfo;
};
export const mockedGetChatInfoByChatId = async (chatId, userId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('ChatId must be a number');
        }

        let chats = mockedChats;
        if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
            chats = getItemFromLocalStorage('chats');
        }

        await new Promise(resolve => setTimeout(resolve, 200));
        const chatInfo = chats.find(chat => chat.id === chatId);
        let username = null;
        let profile_image_url = chatInfo.chat_image_url;
        const chatMembers = getMockedChatMembers(chatId);
        let status = `${pluralize(chatMembers.length, 'участник', 'участника', 'участников')}`;
        if (!chatInfo.is_group) {
            const partnerUserInfo = getUserById(getPartnerChatMember(chatId, userId).id);
            status = partnerUserInfo.status
            chatInfo.name = partnerUserInfo.name || partnerUserInfo.username;
            username = partnerUserInfo.username;
            profile_image_url = partnerUserInfo.profile_image_url;
        }

        const response = {
            id: chatInfo.id,
            name: chatInfo.name,
            created_at: chatInfo.created_at,
            profile_image_url: profile_image_url,
            is_group: chatInfo.is_group,
            username: username,
            status: status,
        }
        return response;

    } catch (error) {
        throw error;
    }
}


export const mockedGetMembersByChatId = async (chatId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('ChatId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        const members = getMockedChatMembers(chatId);
        return members;

    } catch (error) {
        throw error;
    }
}

export const mockedSendMessage = async (message) => {
    try {
        if (!message.content) {
            throw new Error('Ошибка. Пустое сообщение');
        }

        let users = mockedUsers;
        if (import.meta.env.VITE_USE_LOCALSTORAGE === 'true') {
            users = getItemFromLocalStorage('users');
        }

        await new Promise(resolve => setTimeout(resolve, 400));
        const senderInfo = users.find(user => message.sender_id === user.id);
        const senderProfileImageUrl = senderInfo?.profile_image_url;
        const senderUsername = senderInfo?.username;

        const resultedMessage = {...message, user: senderInfo, sender_profile_image_url: senderProfileImageUrl, sender_username: senderUsername}
        pushToLocalStorage('messages', resultedMessage);
        const response = {
            success: true,
            data: {
                ...resultedMessage
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}

initLocalStorage();