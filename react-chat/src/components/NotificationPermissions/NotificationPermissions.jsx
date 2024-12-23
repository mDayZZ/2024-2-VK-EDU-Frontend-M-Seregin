import React, {useEffect} from 'react';
import {useCheckNotificationPermissions} from "../../hooks/useCheckNotificationPermissions.js";
import NotificationModal from "./NotificationModal/NotificationModal.jsx";
import {useModal} from "../../contexts/ModalContext.jsx";

const NotificationPermissions = ({isAuthorized}) => {
    const {openModal, closeModal} = useModal();
    const [notificationAlert, setNotificationAlert] = useCheckNotificationPermissions({isAuthorized});

    useEffect(() => {
        if (notificationAlert) {
            openModal(<NotificationModal closeModal={closeModal} setNotificationAlert={setNotificationAlert}/>)
        }
    }, [notificationAlert])

    return (
        <div>

        </div>
    );
};

export default NotificationPermissions;