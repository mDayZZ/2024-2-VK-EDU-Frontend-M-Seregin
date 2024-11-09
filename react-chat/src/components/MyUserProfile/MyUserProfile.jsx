import React, {useEffect, useState} from 'react';
import Input from "../UI/Input/Input.jsx";
import Form from "../UI/Form/Form.jsx";
import Button from "../UI/Button/Button.jsx";
import {changeUserInfo} from "../../services/userService.js";
import {useUserContext} from "../../contexts/UserContext.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";

const MyUserProfile = ({setInfo, profileName, setProfileName, profileInfo, isEdit, toggleIsEdit}) => {

    const {logout} = useAuth();

    const [editingName, setEditingName] = useState(profileName || '');
    const [editingEmail, setEditingEmail] = useState(profileInfo.email);


    const updateData = async (newUser) => {
        try {


            const response = await changeUserInfo(newUser, profileInfo.id);
            // setUser(response);
            setInfo(response);
            toggleIsEdit();
        } catch (e) {
            console.error(e)
            setProfileName(profileInfo?.name)
        }
    }


    useEffect(() => {
        setProfileName(editingName);
    }, [editingName]);



    const onSubmit = (e) => {
        e.preventDefault();
        const newUserInfo = {...profileInfo, name: editingName, email: editingEmail};
        updateData(newUserInfo);
    };


    return (
        <div>
            {isEdit &&
                <div>
                    <Form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name">Имя</label>
                            <Input maxLength={15} name={'name'} value={editingName} onInput={(e) => setEditingName(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Input name={'email'} value={editingEmail} onInput={(e) => setEditingEmail(e.target.value)} type="text"/>
                        </div>


                        <Button type={'submit'}>Изменить</Button>
                    </Form>
                </div>
            }
            <Button onClick={logout}>Выйти</Button>
        </div>
    );
};

export default MyUserProfile;