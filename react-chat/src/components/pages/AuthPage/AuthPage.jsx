import React, {useState} from 'react';
import Form from "../../UI/Form/Form.jsx";
import Input from "../../UI/Input/Input.jsx";
import Button from "../../UI/Button/Button.jsx";
import tokenService from "../../../services/tokenService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../utils/routes.js";
import {useAuth} from "../../../contexts/AuthContext.jsx";
import {authApi} from "../../../services/api/auth/index.js";

const AuthPage = () => {
    const {login} = useAuth();

    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [requestStatus, setRequestStatus] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        bio: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState, [name]: value
        }));
    };

    const onRequestStart = () => {
        setRequestStatus('');
        setIsLoading(prevState => true);
    }

    const onRequestFinally = () => {
        setIsLoading(prevState => false);
    }


    const postRegister = async (userCreate) => {
        onRequestStart();
        try {
            const response = await authApi.register(userCreate);
            setRequestStatus('Успешно! Авторизуйтесь, используя ваши данные');
            setIsRegister(false);
        } catch (e) {
            console.log(e.message);
            setRequestStatus(JSON.stringify(e.response))
            console.log(e.response);
        }
        finally {
            onRequestFinally();
        }
    }


    const onRegisterFormSubmit = (event) => {
        event.preventDefault();
        const userCreate = {
            username: formData.username,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
            bio: formData.bio,
        }
        postRegister(userCreate);
    }

    const postAuth = async (credentials) => {
        onRequestStart();
        try {
            await login(credentials);
        } catch (e) {
            console.log('бу', e.message);
            setRequestStatus(JSON.stringify(e.response))
            console.log('e resp:', e.response);
        }
        finally {
            onRequestFinally();
        }
    }

    const onAuthFormSubmit = event => {
        event.preventDefault();
        const credentials  = {
            username: formData.username,
            password: formData.password,
        }
        postAuth(credentials);

    }


    return (
        <div>
            <h2>Авторизация</h2>
            <Button type='button' onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Авторизоваться' : 'Создать аккаунт' }</Button>
            {isRegister
                ?
                <Form onSubmit={onRegisterFormSubmit}>
                    <Input placeholder='Имя пользователя' name='username' value={formData.username}
                           onInput={handleInputChange} required={true}/>
                    <Input placeholder='Пароль' name='password' value={formData.password} onInput={handleInputChange}
                           required={true}/>
                    <Input placeholder='Имя' name='first_name' value={formData.first_name} onInput={handleInputChange}
                           required={true}/>
                    <Input placeholder='Фамилия' name='last_name' value={formData.last_name} onInput={handleInputChange}
                           required={true}/>
                    <Input placeholder='Био' name='bio' value={formData.bio} onInput={handleInputChange}/>
                    <Button>Зарегистироваться</Button>
                </Form>

                :
                <Form onSubmit={onAuthFormSubmit}>
                    <Input placeholder='Имя пользователя' value={formData.username} onInput={handleInputChange}
                           name='username'/>
                    <Input placeholder='Пароль' value={formData.password} onInput={handleInputChange} name='password'/>
                    <Button >Войти</Button>
                </Form>
            }
            {isLoading &&
                <h3>Загрузка...</h3>
            }
            <p>{requestStatus}</p>
        </div>
);
};

export default AuthPage;