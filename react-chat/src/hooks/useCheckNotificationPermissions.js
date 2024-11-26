import {useEffect, useState} from "react";
import {useModal} from "../contexts/ModalContext.jsx";
import {useCentrifugo} from "../contexts/CentrifugoContext.jsx";
import {useOnReceivedMessage} from "./useOnRecievedMessage.js";
import {getUserVisibleName} from "../utils/getUserVisibleName.js";

export const useCheckNotificationPermissions = ({isAuthenticated}) => {
    const [notificationAlert, setNotificationAlert] = useState(false);
    const {openModal, closeModal} = useModal();



    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }
        if (!('Notification' in window)) {
            return;
        }
        if (Notification.permission !== 'granted') {
            openModal(
               `Разрешите отправку уведомлений для лучшего опыта`);
            Notification.requestPermission().then(permission => {
                closeModal();
                setNotificationAlert(false);
                if (permission === 'granted') {
                    const notification = new Notification("Ура!)")
                }
            })
        }
    }, [isAuthenticated])
}