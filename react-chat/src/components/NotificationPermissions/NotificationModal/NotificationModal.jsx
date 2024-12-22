import React from 'react';
import Button from "../../UI/Button/Button.jsx";

const NotificationModal = ({closeModal, setNotificationAlert}) => {
    const handleRequsetNotification = () => {
        Notification.requestPermission().then(permission => {
            setNotificationAlert(false);
            if (permission === 'granted') {
                new Notification("Ура!)")
            }
            closeModal();
        })
    }

    return (
        <div>
            <p>Разрешите уведомления, чтобы не пропустить сообщения</p>
            <Button onClick={handleRequsetNotification}>Разрешить</Button>
        </div>
    )
}

export default NotificationModal;