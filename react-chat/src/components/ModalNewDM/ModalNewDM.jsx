import React, {useRef} from 'react';
import Form from "../UI/Form/Form.jsx";
import classes from "./ModalNewDM.module.scss";
import TextArea from "../UI/TextArea/TextArea.jsx";
import Button from "../UI/Button/Button.jsx";
import {useFetch} from "../../hooks/useFetch.js";
import {chatService} from "../../services/api/chatService.js";
import {messageService} from "../../services/api/messageService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../../utils/routes.js";
import {useModal} from "../../contexts/ModalContext.jsx";

const ModalNewDM = ({participant}) => {

    const navigate = useNavigate();
    const {closeModal} = useModal();

    const messageInputRef = useRef();

    const [createNewPrivateChat, isCreateLoading, onCreateError] = useFetch(async () => {
        const chatData = {
            is_private: true,
            members: [participant.id],
        }
        return chatService.createChat(chatData);
    })

    const [sendMessage, isSendMessageLoading, onSendMessageError] = useFetch(async (newMessage) => {


        return messageService.sendMessage(newMessage);
    })



    const onSendMessage = async (event)=> {
        event.preventDefault();
        const createdChat = await createNewPrivateChat();

        const inputText = messageInputRef.current.value.trim();
        const chatId = createdChat.id;

        if (!inputText || !chatId) {
            console.log('ru');
            return;
        }

        const newMessage = {
            chat: chatId,
            text: inputText,
            voice: null,
        }

        await sendMessage(newMessage);

        closeModal();
        navigate(routes.chat(chatId));
    }


    return (
        <div className={classes.dm}>
            <p className={classes.dm__title}>Личное сообщение</p>
            <Form onSubmit={onSendMessage}>
                <TextArea ref={messageInputRef} className=''/>
                {
                    (isCreateLoading || isSendMessageLoading)
                        ? <Button disabled>Отправить</Button>
                        : <Button>Отправить</Button>
                }
            </Form>
        </div>
    );
};

export default ModalNewDM;