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
        const chatsId = mockedChatMembers.map(chatMember => {
            if (chatMember.user_id === userId) {
                return chatMember.chat_id;
            }
        })
        const filteredChats = mockedChats.filter(chat => chatsId.includes(chat.id));
        return filteredChats;

    } catch (error) {
        throw error;
    }

}

export const mockedGetMessagesByChatId = async (chatId) => {
    try {
        if (typeof chatId !== 'number') {
            throw new Error('userId must be a number');
        }
        await new Promise(resolve => setTimeout(resolve, 300));
        const filteredMessages = mockedMessages.filter(message => message.chat_id === chatId);
        return filteredMessages;

    } catch (error) {
        throw error;
    }

}
