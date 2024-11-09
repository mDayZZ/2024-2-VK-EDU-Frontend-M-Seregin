import { mockedUsers } from "./users.js";
import { mockedChatMembers } from "./chat_members.js";
import { mockedChats } from "./chats.js";
import { mockedMessages } from "./messages.js";
import { pluralize } from "../utils/pluralize.js";
import {
    getItemFromLocalStorage,
    initToLocalStorage,
    pushToLocalStorage,
    saveItemToLocalStorage
} from "../utils/localStorage.js";
import {getUniqueId} from "../utils/idGenerator.js";

const initLocalStorage = () => {
    initToLocalStorage('chats', mockedChats);
    initToLocalStorage('messages', mockedMessages);
    initToLocalStorage('users', mockedUsers);
    initToLocalStorage('chatMembers', mockedChatMembers);
};

const getUserById = (userId) => {
    if (!userId) {
        throw new Error("userId is required in getUserById");
    }
    const users = getItemFromLocalStorage('users');
    return users.find(user => user.id === userId);
};

const getUserChatsId = (userId) => {
    if (!userId) {
        throw new Error('userId needed in getUserChatsId');
    }
    const chatMembers = getItemFromLocalStorage('chatMembers');
    return chatMembers.filter(chatMember => chatMember.user_id === userId)
        .map(chatMember => chatMember.chat_id);
};

const getChatsLastMessages = (chatsId) => {
    if (!Array.isArray(chatsId)) {
        throw new Error('chatId must be an array in chatsLastMessage');
    }
    const messages = getItemFromLocalStorage('messages');
    return chatsId.map(chatId => {
        const chatMessages = messages.filter(message => message.chat_id === chatId);
        if (!chatMessages.length) return null;

        return chatMessages.reduce((lastMessage, chatMessage) =>
            !lastMessage || new Date(lastMessage.created_at) < new Date(chatMessage.created_at)
                ? chatMessage
                : lastMessage
        );
    }).map(lastMessage => {
        if (!lastMessage) return null;
        const userInfo = getUserById(lastMessage.sender_id);
        return { ...lastMessage, user: userInfo };
    });
};

export const mockedGetUserById = async (userId) => {
    if (typeof userId !== 'number') throw new Error('userId must be a number');
    await new Promise(resolve => setTimeout(resolve, 500));
    return getUserById(userId);
};

export const mockedChangeUserInfo = async (userInfo, userId) => {
    if (typeof userId !== 'number' && typeof userInfo !== 'object') {
        throw new Error('userId must be a number');
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    const users = getItemFromLocalStorage('users');
    const changedUsers = users.map(user => user.id === userId ? userInfo : user);
    saveItemToLocalStorage('users', changedUsers);
    return userInfo;
};

const getPartnerChatMember = (chatId, userId) => {
    const chatMembers = getItemFromLocalStorage('chatMembers');
    return chatMembers.filter(chatMember => chatMember.chat_id === chatId)
        .find(chatMember => chatMember.user_id !== userId);
};

export const mockedGetChatsByUserId = async (userId) => {
    if (typeof userId !== 'number') throw new Error('userId must be a number');
    await new Promise(resolve => setTimeout(resolve, 500));

    const chatsId = getUserChatsId(userId);
    const userChats = getItemFromLocalStorage('chats').filter(chat => chatsId.includes(chat.id));

    return userChats.map(userChat => {
        if (!userChat.is_group) {
            const partnerChatMember = getPartnerChatMember(userChat.id, userId);
            const partnerUserInfo = getUserById(partnerChatMember.user_id);
            userChat.name = partnerUserInfo.name || partnerUserInfo.username;
            userChat.chat_image_url = partnerUserInfo.profile_image_url;
        }
        const chatLastMessage = getChatsLastMessages(chatsId).find(
            lastMessage => lastMessage && lastMessage.chat_id === userChat.id
        );
        return { ...userChat, last_message: chatLastMessage };
    });
};

export const mockedGetMessagesByChatId = async (chatId) => {
    if (typeof chatId !== 'number') throw new Error('chatId must be a number');
    await new Promise(resolve => setTimeout(resolve, 300));
    const messages = getItemFromLocalStorage('messages');
    const users = getItemFromLocalStorage('users');
    return messages.filter(message => message.chat_id === chatId)
        .map(message => {
            const sender = users.find(user => user.id === message.sender_id);
            return {
                ...message,
                sender_name: sender?.name || sender?.username,
                sender_username: sender?.username || 'Unknown',
                sender_profile_image_url: sender?.profile_image_url || '',
            };
        });
};

const getChatMembers = (chatId) => {
    const chatMembers = getItemFromLocalStorage('chatMembers');
    const users = getItemFromLocalStorage('users');
    return chatMembers.filter(chatMember => chatMember.chat_id === chatId)
        .map(member => users.find(user => user.id === member.user_id));
};

export const mockedGetChatInfoByChatId = async (chatId, userId) => {
    if (typeof chatId !== 'number') throw new Error('ChatId must be a number');
    await new Promise(resolve => setTimeout(resolve, 200));
    const chats = getItemFromLocalStorage('chats');
    const chatInfo = chats.find(chat => chat.id === chatId);
    const chatMembers = getChatMembers(chatId);


    let chatStatus = `${pluralize(chatMembers.length, 'участник', 'участника', 'участников')}`;
    let email = null;

    if (!chatInfo.is_group) {
        const partnerUserInfo = getUserById(getPartnerChatMember(chatId, userId).id);
        chatInfo.name = partnerUserInfo.name || partnerUserInfo.username;
        chatInfo.username = partnerUserInfo.username;
        chatInfo.chat_image_url = partnerUserInfo.profile_image_url;
        chatStatus = partnerUserInfo.status;
        email = partnerUserInfo.email;

    }

    return {
        id: chatInfo.id,
        name: chatInfo.name,
        created_at: chatInfo.created_at,
        profile_image_url: chatInfo.chat_image_url,
        is_group: chatInfo.is_group,
        username: chatInfo.username,
        status: chatStatus,
        email: email,
    };
};

export const mockedGetMembersByChatId = async (chatId) => {
    if (typeof chatId !== 'number') throw new Error('ChatId must be a number');
    await new Promise(resolve => setTimeout(resolve, 200));
    return getChatMembers(chatId);
};

export const mockedSendMessage = async (message) => {
    if (!message.content) throw new Error('Ошибка. Пустое сообщение');
    await new Promise(resolve => setTimeout(resolve, 400));

    const users = getItemFromLocalStorage('users');
    const senderInfo = users.find(user => message.sender_id === user.id);
    const resultedMessage = {
        ...message,
        user: senderInfo,
        sender_profile_image_url: senderInfo?.profile_image_url,
        sender_name: senderInfo?.name,
        sender_username: senderInfo?.username,
    };

    pushToLocalStorage('messages', resultedMessage);
    return { success: true, data: resultedMessage };
};

export const mockedDeleteChatMessages = async (chatId) => {
    const messages = getItemFromLocalStorage('messages');
    const newMessages = messages.filter(message => message.chat_id !== chatId);
    saveItemToLocalStorage('messages', newMessages);
    return [];
};


export const mockedGetAllUsers = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const users = await getItemFromLocalStorage('users');
    return users;
}

export const mockedCreateChat = async (chatTitle, chosenMembers, userId) => {

    const chatId = getUniqueId();

    const createChat = () => {

        const chats = getItemFromLocalStorage('chats');
        const newChat = {
            id: chatId,
            is_group: true,
            created_at: new Date().toISOString(),
            name: chatTitle,
            chat_image_url: null,
        }

        chats.push(newChat);

        saveItemToLocalStorage('chats', chats);
    }

    const addChatMembers = () => {
        const chatMembers = getItemFromLocalStorage('chatMembers');
        chosenMembers.forEach(memberId => {
            const newMember = {
                id: getUniqueId(),
                chat_id: chatId,
                user_id: memberId,
                role: 'member',
            }
            chatMembers.push(newMember);
        })
        const adminMember = {
            id: getUniqueId(),
            chat_id: chatId,
            user_id: userId,
            role: 'admin',
        }
        chatMembers.push(adminMember);

        saveItemToLocalStorage('chatMembers', chatMembers);
    }

    createChat();
    addChatMembers();
    return chatId;
}

initLocalStorage();
