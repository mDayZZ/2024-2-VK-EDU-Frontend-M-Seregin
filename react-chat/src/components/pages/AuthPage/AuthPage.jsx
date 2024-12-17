import React, {useEffect, useState} from 'react';

import classes from './AuthPage.module.scss';
import DefaultHeader from "../../UI/DefaultHeader/DefaultHeader.jsx";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import Page from "../../UI/Page/Page.jsx";
import Form from "../../UI/Form/Form.jsx";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import TextButton from "../../UI/TextButton/TextButton.jsx";
import {authService} from "../../../services/api/authService.js";
import {userService} from "../../../services/api/userService.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchUserData} from "../../../store/auth/authThunks.js";
import Logo from "../../UI/Logo/Logo.jsx";
import {routes as router} from "../../../utils/routes.js";
import {defaultVars} from "../../../utils/defaultVars.js";

const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [authData, setAuthData] = useState(defaultVars.authData
    );
    const [registerData, setRegisterData] = useState(defaultVars.registerData);
    const [authStatus, setAuthStatus] = useState(defaultVars.authStatus);

    const handleAuthDataChange = (e) => {
        const {name, value} = e.target;
        setAuthData(prevState => ({...prevState, [name]: value}));
    }


    const onAuthSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", authData.username);
        formData.append("password", authData.password);
        try {
            await authService.login(formData);
            dispatch(fetchUserData());
            navigate(router.chats);




        } catch (error) {
            const errorData = error.response.data;
            setAuthStatus(prevState => ({username: errorData?.username, password: errorData?.password, detail: errorData?.detail}) );
        }
    }

    const toggleIsRegister = () => {
        setIsRegister(prev => !prev);
    }

    const handleRegisterDataChange = (e) => {
        const {name, value} = e.target;
        setRegisterData(prevState => ({...prevState, [name]: value}));
    }

    const onRegisterSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", registerData.username);
        formData.append("password", registerData.password);
        formData.append("first_name", registerData.first_name);
        formData.append("last_name", registerData.last_name);
        formData.append("bio", registerData.bio);
        // formData.append("avatar", null);
        try {
            const data = await authService.register(formData);
        } catch (error) {
            console.log(error.response.data)
            const errorData = error.response.data;
            setAuthStatus(prevState => ({username: errorData?.username, password: errorData?.password, first_name: errorData?.first_name, last_name: errorData?.last_name, common: errorData?.detail}) );
        }
    }


    return (
        <Page>
            <DefaultHeader>
                <Logo/>
            </DefaultHeader>
            <DefaultMain className={classes.authPage}>
                <div className={classes.authPage__container}>
                    {isRegister
                        ?
                        <>
                            <h2>Регистрация</h2>
                            <Form className={classes.authForm} onSubmit={onRegisterSubmit}>
                                <div className={classes.authForm__inputFields}>

                                    <Input value={registerData.username} name="username" placeholder="Логин"
                                           onChange={handleRegisterDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus.username}</p>
                                    <Input value={registerData.password} name="password" placeholder="Пароль"
                                           type="password" onChange={handleRegisterDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus.password}</p>
                                    <Input value={registerData.first_name} name="first_name" placeholder="Имя"
                                           onChange={handleRegisterDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus.first_name}</p>
                                    <Input value={registerData.last_name} name="last_name" placeholder="Фамилия"
                                           onChange={handleRegisterDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus.last_name}</p>
                                    <Input value={registerData.bio} name="bio" placeholder="О себе"
                                           onChange={handleRegisterDataChange}></Input>
                                </div>
                                <Button>Зарегистрироваться</Button>
                                <p className={classes.authForm__status}>{authStatus.detail}</p>
                                <TextButton type='button' onClick={toggleIsRegister}>Есть аккаунт</TextButton>
                            </Form>
                        </>

                        :
                        <>
                            <h2>Авторизация</h2>
                            <Form className={classes.authForm} onSubmit={onAuthSubmit}>
                                <div className={classes.authForm__inputFields}>
                                    <Input value={authData.username} name="username" placeholder="Логин"
                                           onChange={handleAuthDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus.username}</p>
                                    <Input value={authData.password} name="password" placeholder="Пароль"
                                           type="password"
                                           onChange={handleAuthDataChange}></Input>
                                    <p className={classes.authForm__status}>{authStatus?.password}</p>
                                </div>
                                <Button>Войти</Button>
                                <p className={classes.authForm__status}>{authStatus.detail}</p>
                                <TextButton type='button' onClick={toggleIsRegister}>Создать аккаунт</TextButton>
                            </Form>
                        </>

                    }

                </div>

            </DefaultMain>
        </Page>
    );
};

export default AuthPage;