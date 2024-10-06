import {chats, users} from "./mockData";



export const getUserById = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 20));
    try {
        const user = users.find(user => String(user.id) === String(id));
        if (!user) {
            return null;
        }
        return user;

    } catch (error) {
        console.error('Ошибка получения пользователя по id');
        throw error;
    }
}

export const getChatsByUserId = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 30));
    try {
        if (!chats) {
            return null;
        }
        return chats;
    } catch (error) {
        console.error('Ошибка получения чатов по id пользователя');
        throw error;
    }
}

