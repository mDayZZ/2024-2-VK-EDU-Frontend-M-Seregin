import {useEffect, useState} from "react";

export const useCheckNotificationPermissions = ({isAuthorized}) => {
    const [notificationAlert, setNotificationAlert] = useState(false);
    useEffect(() => {
        if (!isAuthorized) {
            return;
        }
        if (!('Notification' in window)) {
            return;
        }
        if (Notification.permission === 'default') {
            setNotificationAlert(true);
        }
    }, [isAuthorized])

    return [notificationAlert, setNotificationAlert];

}