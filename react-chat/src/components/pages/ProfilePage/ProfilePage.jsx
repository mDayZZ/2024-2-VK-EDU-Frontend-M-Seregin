import React, {useEffect, useState} from 'react';
import Page from "../../UI/Page/Page.jsx";
import classes from "./ProfilePage.module.scss";
import DefaultHeader from "../../UI/DefaultHeader/DefaultHeader.jsx";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import {getChatInfoByChatId} from "../../../services/chatService.js";
import {useParams} from "react-router-dom";
const   ProfilePage = ({userInfo}) => {
    const {id} = useParams();
    const chatId = Number(id);
    const [chatInfo, setChatInfo] = useState(null);
    console.log(chatId, userInfo)
    const fetchChatInfo = async () => {

        const fetchedInfo = await getChatInfoByChatId(chatId, userInfo.id);
        setChatInfo(fetchedInfo);
    }
    console.log(chatInfo)
    useEffect(() => {
        fetchChatInfo();
    }, []);
    return (
        <Page>
            <DefaultHeader>
                <h2>Профиль</h2>
            </DefaultHeader>
            <DefaultMain>

            </DefaultMain>
        </Page>
    );
};

export default ProfilePage;