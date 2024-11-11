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
import MemberList from "../MemberList/MemberList.jsx";
import {routes, routes as router} from "../../utils/routes.js";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {usersApi} from "../../services/api/users/index.js";
import FinderInput from "../UI/FinderInput/FinderInput.jsx";
import {chatsApi} from "../../services/api/chats/index.js";
const CreateChat = ({closeModal}) => {
    const navigate = useNavigate();

    const {user: userInfo} = useAuth();

    const [users, setUsers] = useState(null);

    const [chatTitle, setChatTitle] = useState('');

    const [chosenMembers, setChosenMembers] = useState([]);

    const [usersQuery, setUsersQuery] = useState('');

    const fetchUsers = async (usersQuery) => {
        const params = {
            search: String(usersQuery),
        }
        const {count, next, previous, results} = await usersApi.get(params);
        setUsers(results);
    }




    useEffect( () => {
        fetchUsers(usersQuery)
    }, [usersQuery, ])


    const handleCheckboxChange = (userId) => {
        setChosenMembers((prevChosenMembers) => {
            if (prevChosenMembers.includes(userId)) {
                return prevChosenMembers.filter((id) => id !== userId);
            } else {
                return [...prevChosenMembers, userId];
            }
        });
    };

    const fetchCreateChat = async (newChat) => {
        const createdChat = await chatsApi.createChat(newChat);
        closeModal();
        // navigate(routes.chat(createdChat.id));

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newChat = {
            title: chatTitle,
            is_private: false,
            avatar: null,
            members: [...chosenMembers, userInfo.id],
        }
        fetchCreateChat(newChat);
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
                    <FinderInput value={usersQuery} onInput={(e) => setUsersQuery(e.target.value)} />
                    <MemberList chosenMembers={chosenMembers} userInfo={userInfo} handleCheckboxChange={handleCheckboxChange} users={users} />

                </div>
                <Button>Создать</Button>
            </Form>
        </div>
    );
};

export default CreateChat;