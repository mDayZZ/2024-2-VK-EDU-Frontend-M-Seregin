import React, {useEffect, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import {getUsers} from "../../services/userService.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";

import classes from "./CreateChat.module.scss";
import Button from "../UI/Button/Button.jsx";
import {useUserContext} from "../../contexts/UserContext.jsx";
import {createChat} from "../../services/chatService.js";
import {useNavigate} from "react-router-dom";
const CreateChat = ({closeModal}) => {
    const navigate = useNavigate();

    const {user: userInfo} = useUserContext();

    const [users, setUsers] = useState(null);

    const [chatTitle, setChatTitle] = useState('');

    const [chosenMembers, setChosenMembers] = useState([]);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response);
    }



    useEffect(() => {
        fetchUsers();
    }, []);


    const handleCheckboxChange = (userId) => {
        setChosenMembers((prevChosenMembers) => {
            if (prevChosenMembers.includes(userId)) {
                return prevChosenMembers.filter((id) => id !== userId);
            } else {
                return [...prevChosenMembers, userId];
            }
        });
    };

    const fetchCreateChat = async () => {
        const newChatId = await createChat(chatTitle, chosenMembers, userInfo.id);
        closeModal();
        navigate(`/chats/${newChatId}`);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        fetchCreateChat();
    }


    return (
        <div>
            <h2>Создать чат</h2>
            <Form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="chatTitle">Название чата</label>
                    <Input name='chatTitle' required={true} value={chatTitle} onInput={(e) => setChatTitle(e.target.value)} type="text"/>
                </div>
                <div>
                    <label htmlFor="">Участники</label>
                    <ul className={classes.createChat__memberList}>

                        {users &&
                            users.map(user => {
                                if (user.id === userInfo.id) {
                                    return;
                                }
                                const userName = user?.name || user.username;
                                const userAvatar = user.profile_image_url;

                                return (
                                    <li key={user.id}>
                                        <label>
                                            <div className={classes.createChat__profileItem}>
                                                <input type="checkbox"
                                                       onChange={() => handleCheckboxChange(user.id)}
                                                       checked={chosenMembers.includes(user.id)}/>
                                                <RoundAvatar className={classes.createChat__avatar} src={userAvatar}/>
                                                <p>{userName}</p>
                                            </div>
                                        </label>

                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
                <Button>Создать</Button>
            </Form>
        </div>
    );
};

export default CreateChat;