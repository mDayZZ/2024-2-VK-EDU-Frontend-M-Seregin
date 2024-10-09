import {getChatsFromLocalStorage, saveChatsToLocalStorage} from "./storage";
import {getChatsByUserId} from "../api/userApi";

export const getChats = async (userId) => {
    let chats = getChatsFromLocalStorage();
    console.log(chats, 'после локалстоража')
    if (chats.length === 0) {
        chats = await getChatsByUserId(userId);
        console.log(chats, 'после апишочки')
        saveChatsToLocalStorage(chats);
    }
    if (!chats) {
        console.log('не чатс', chats);
        return null;
    }
    return chats;
}