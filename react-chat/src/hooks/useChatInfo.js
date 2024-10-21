import {useEffect, useState} from "react";
import {pluralize} from "../utils/pluralize.js";
import {getUserById} from "../services/userService.js";
import {getMembersByChatId} from "../services/chatService.js";

const useChatInfo = (chatInfo, userId) => {
    const [chatStatus, setChatStatus] = useState('');
    const [contactName, setContactName] = useState(null);
    const [contactAvatar, setContactAvatar] = useState(null);
    const [chatTitle, setChatTitle] = useState('');
    const [chatMembers, setChatMembers] = useState([]);

    useEffect(() => {
        const fetchChatData = async () => {
            if (chatInfo.id) {
                const fetchedChatMembers = await getMembersByChatId(chatInfo.id);
                setChatMembers(fetchedChatMembers);

                if (chatInfo.is_group) {
                    const chatMembersValue = fetchedChatMembers.length;
                    setChatStatus(pluralize(chatMembersValue, 'участник', 'участника', 'участников'));
                    setContactName(null);
                    setContactAvatar(null);
                    setChatTitle(chatInfo.name); // Устанавливаем название группы
                } else {
                    // Если это приватный чат
                    const chatMember = fetchedChatMembers.find(member => member.id !== userId);
                    if (chatMember) {
                        const chatMemberUserInfo = await getUserById(chatMember.user_id);
                        setChatStatus(chatMemberUserInfo?.status);
                        setContactName(chatMemberUserInfo?.username);
                        setContactAvatar(chatMemberUserInfo?.profile_image_url);
                        setChatTitle(chatMemberUserInfo?.username); // Устанавливаем имя собеседника
                    }
                }
            }
        };

        fetchChatData();
    }, [chatInfo, userId]); // Выполняем при изменении chatInfo или userId

    return { chatMembers, chatStatus, contactName, contactAvatar, chatTitle };
};

export default useChatInfo;