import {mockedUsers} from "./users.js";
import {mockedChatMembers} from "./chat_members.js";
import {mockedChats} from "./chats.js";
import {mockedMessages} from "./messages.js";
import {pluralize} from "../utils/pluralize.js";

const getUserById = (userId) => {
    if (!userId) {
        throw new Error("userId is required in getUserById");
    }
    const userInfo = mockedUsers.find(user => user.id === userId);
    return userInfo;
};


const getUserChatsId = (userId) => {
    if (!userId) {
        throw new Error('userId needed in getUserChatsId');
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
        const chatMessages = mockedMessages.filter(message => message.chat_id === chatId);
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

const getPartnerChatMember = (chatId, userId) => {
    return mockedChatMembers
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
        const userChats = mockedChats.filter(chat => chatsId.includes(chat.id));
        const chatsLastMessages = getChatsLastMessages(chatsId);

        const resultChats = userChats.map(userChat => {
            if (!userChat.is_group) {
                const partnerChatMember = getPartnerChatMember(userChat.id, userId);
                const partnerUserInfo = getUserById(partnerChatMember.id);
                userChat.name = partnerUserInfo.name || partnerUserInfo.username;
                userChat.chat_image_url = partnerUserInfo.profile_image_url;
            }
            const chatLastMessage = chatsLastMessages.find(lastMessage => lastMessage.chat_id === userChat.id)
            return {...userChat, last_message: chatLastMessage};
        })
        console.log(resultChats);

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

        const chatMessages = mockedMessages.filter(message => message.chat_id === chatId);

        const enrichedMessages = chatMessages.map(message => {
            const sender = mockedUsers.find(user => user.id === message.sender_id);
            return {
                ...message,
                sender_username: sender?.username || 'Unknown',
                sender_profile_image_url: sender?.profile_image_url || '',
            };
        });

        return enrichedMessages;

    } catch (error) {
        throw error;
    }
};

const getChatMembers = (chatId) => {
    const members = mockedChatMembers.filter(chatMember => chatMember.chat_id === chatId);
    const membersUserInfo = members.map(member => mockedUsers.find(user => user.id === member.id));

    return membersUserInfo;
};
export const mockedGetChatInfoByChatId = async (chatId, userId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('ChatId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        const chatInfo = mockedChats.find(chat => chat.id === chatId);
        if (!chatInfo.is_group) {
            const partnerUserInfo = getUserById(getPartnerChatMember(chatId, userId).id);
            chatInfo.status = partnerUserInfo.status
            return chatInfo;
        }

        const chatMembers = getChatMembers(chatId)
        chatInfo.status = `${pluralize(chatMembers.length, 'участник', 'участника', 'участников')}`;
        return chatInfo;

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
        const chatMembers = mockedChatMembers.filter(member => member.chat_id === chatId);
        return chatMembers;
    } catch (error) {
        throw error;
    }
}

export const mockedSendMessage = async (message) => {
    try {
        if (!message.content) {
            throw new Error('Ошибка. Пустое сообщение');
        }
        await new Promise(resolve => setTimeout(resolve, 400));
        const senderInfo = mockedUsers.find(user => message.sender_id === user.id);
        const senderProfileImageUrl = senderInfo?.profile_image_url;
        const senderUsername = senderInfo?.username;

        const resultedMessage = {...message, sender_profile_image_url: senderProfileImageUrl, sender_username: senderUsername}

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