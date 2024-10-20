import {mockedUsers} from "./users.js";
import {mockedChatMembers} from "./chat_members.js";
import {mockedChats} from "./chats.js";
import {mockedMessages} from "./messages.js";

export const mockedGetUserById = async (userId) => {
    try {
        if (typeof userId !== 'number') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        const userInfo = mockedUsers.find(user => user.id === userId);
        return userInfo;

    } catch (error) {
        throw error;
    }

}


export const mockedGetChatsByUserId = async (userId) => {
    try {
        if (typeof userId !== 'number') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 500));

        const chatsId = mockedChatMembers
            .filter(chatMember => chatMember.user_id === userId)
            .map(chatMember => chatMember.chat_id);

        const filteredChats = mockedChats.filter(chat => chatsId.includes(chat.id));

        const lastMessages = chatsId.map(chatId => {
            const messages = mockedMessages.filter(message => message.chat_id === chatId);
            if (messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                return { chat_id: chatId, last_message: lastMessage };
            }
            return { chat_id: chatId, last_message: null };
        });

        const resultedChats = filteredChats.map(chat => {
            const lastMessageData = lastMessages.find(message => message.chat_id === chat.id);
            return {
                ...chat,
                last_message: lastMessageData ? lastMessageData.last_message?.content || null : null,
                last_message_time: lastMessageData ? lastMessageData.last_message?.created_at || null : null
            };
        });

        return resultedChats;

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

export const mockedGetChatInfoByChatId = async (chatId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('ChatId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        const chatInfo = mockedChats.find(chat => chat.id === chatId);
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