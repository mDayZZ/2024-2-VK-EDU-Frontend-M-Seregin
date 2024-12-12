import React, {useEffect, useState} from 'react';
import Input from "../UI/Input/Input.jsx";
import Form from "../UI/Form/Form.jsx";
import Button from "../UI/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch.js";
import {userService} from "../../services/api/userService.js";

const MyUserProfile = ({info, setInfo, setVisibleTitle, isEdit, toggleIsEdit, newUserAvatar}) => {
    const navigate = useNavigate();

    const [fetchUserInfo, isLoading, error] = useFetch(async (newProfile) => {
        const response = await userService.changeUserInfo(info.id, newProfile);
        console.log(response)
        setInfo(response);
    });

    const [fetchUpdateAvatar, isAvatarLoading, avatarError] = useFetch(async (newAvatar) => {
        const data = new FormData();
        data.append('avatar', newAvatar)
        const response = await userService.changeUserInfo(info.id, data)
        setInfo(response);
    })


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
            await fetchUserInfo(newProfile);
        } catch (e) {
            console.error(e);
        } finally {
            toggleIsEdit();
        }

    };


    useEffect(() => {
        if (!newUserAvatar) {
            return;
        }
        fetchUpdateAvatar(newUserAvatar);
    }, [newUserAvatar])

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
        </div>
    );
};

export default MyUserProfile;