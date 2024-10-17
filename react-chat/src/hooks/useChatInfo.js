import {useEffect, useState} from "react";
import {getUserById} from "../services/userService.js";
import {pluralize} from "../utils/pluralize.js";

export const useChatInfo = ( userInfo, chatInfo, chatMembers) => {
    const [chatStatus, setChatStatus] = useState('');
    const [chatTitle, setChatTitle] = useState('');

    const useChatInfo = (chatInfo, initialChatMembers, userInfo) => {
        const [chatStatus, setChatStatus] = useState('');
        const [chatTitle, setChatTitle] = useState('');
        const [chatMembers, setChatMembers] = useState(initialChatMembers);

        useEffect(() => {
            const fetchChatMemberInfo = async () => {
                if (chatInfo.is_group) {
                    const chatMembersValue = chatMembers.length;
                    setChatStatus(pluralize(chatMembersValue, 'участник', 'участника', 'участников'));
                    setChatTitle(chatInfo.name); // Название группы
                } else {
                    const chatMember = chatMembers.find(member => member.id !== userInfo.id);
                    if (chatMember) {
                        const chatMemberUserInfo = await getUserById(chatMember.user_id);
                        setChatStatus(chatMemberUserInfo?.status);
                        setChatTitle(chatMemberUserInfo?.username); // Имя собеседника
                    }
                }
            };

            fetchChatMemberInfo();
        }, [chatInfo, chatMembers, userInfo]);

        return {chatStatus, chatTitle, chatMembers, setChatMembers};
    }
}