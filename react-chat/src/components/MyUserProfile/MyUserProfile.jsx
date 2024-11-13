import React, {useEffect, useState} from 'react';
import Input from "../UI/Input/Input.jsx";
import Form from "../UI/Form/Form.jsx";
import Button from "../UI/Button/Button.jsx";
import {changeUserInfo} from "../../services/userService.js";
import {useUserContext} from "../../contexts/UserContext.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {userApi} from "../../services/api/user/index.js";

const MyUserProfile = ({info, setInfo, setVisibleTitle, profileInfo, isEdit, toggleIsEdit}) => {

    const {logout} = useAuth();

    const [editingName, setEditingName] = useState(info.first_name || '');
    const [editingLastName, setEditingLastName] = useState(info.last_name || '');
    const [editingBio, setEditingBio] = useState(info.bio || '');

    useEffect(() => {
        setVisibleTitle(`${editingName} ${editingLastName}`.trim());
    }, [editingName, editingLastName]);


    const onSubmit = async (e) => {
    e.preventDefault();

    const newProfile = {
        first_name: editingName.trim(),
        last_name: editingLastName.trim(),
        bio: editingBio.trim(),
    }

    try {
        const response = await userApi.changeInfo(info.id, newProfile);
        console.log('response', response);
        setInfo(response);

    } catch (e) {
        console.error(e);
    } finally {
        toggleIsEdit();
    }

    };

    return (
        <div>
            {isEdit &&
                <div>
                    <Form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name">Имя</label>
                            <Input maxLength={15} name='name' value={editingName}
                                   onInput={(e) => setEditingName(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label htmlFor="lastName">Фамилия</label>
                            <Input name='lastName' value={editingLastName}
                                   onInput={(e) => setEditingLastName(e.target.value)} type="text"/>
                        </div>
                        <div>
                            <label htmlFor="bio">Био</label>
                            <Input name='bio' value={editingBio}
                                   onInput={(e) => setEditingBio(e.target.value)} type="text"/>
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