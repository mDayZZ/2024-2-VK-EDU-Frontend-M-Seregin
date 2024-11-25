import React, {useEffect, useState} from 'react';
import Form from "../UI/Form/Form.jsx";
import Input from "../UI/Input/Input.jsx";
import Button from "../UI/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import MemberList from "../MemberList/MemberList.jsx";
import {usersApi} from "../../services/api/users/index.js";
import FinderInput from "../UI/FinderInput/FinderInput.jsx";
import {chatsApi} from "../../services/api/chats/index.js";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/auth/authSelectors.js";
import {useFetch} from "../../hooks/useFetch.js";
import {userService} from "../../services/api/userService.js";
import {routes} from "../../utils/routes.js";
import useDebounce from "../../hooks/useDebounce.js";
import {chatService} from "../../services/api/chatService.js";

const CreateChat = ({closeModal}) => {
    const navigate = useNavigate();

    const {user: userInfo} = useSelector(authSelector);

    const [users, setUsers] = useState(null);

    const [chatTitle, setChatTitle] = useState('');

    const [chosenMembers, setChosenMembers] = useState([]);

    const [usersQuery, setUsersQuery] = useState('');
    const debouncedUsersQuery = useDebounce(usersQuery, 500);

    const [fetchUsers, isUsersLoading, usersError] = useFetch(async (usersQuery) => {
        const params = {
            search: String(usersQuery),
        }
        const {count, next, previous, results} = await userService.getUsers(params);
        setUsers(results);
    })

    const [fetchCreateChat, isChatLoading, chatError] = useFetch(async (newChat) => {
        const createdChat = await chatService.createChat(newChat);
        closeModal();
        console.log(createdChat, 'createdChat');
        navigate(routes.chat(createdChat.id));
    })

    useEffect( () => {
        fetchUsers(usersQuery)
    }, [debouncedUsersQuery, ])


    const handleCheckboxChange = (userId) => {
        setChosenMembers((prevChosenMembers) => {
            if (prevChosenMembers.includes(userId)) {
                return prevChosenMembers.filter((id) => id !== userId);
            } else {
                return [...prevChosenMembers, userId];
            }
        });
    };



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