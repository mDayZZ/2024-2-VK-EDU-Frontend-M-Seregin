import {useCentrifugo} from "../contexts/CentrifugoContext.jsx";
import {useEffect} from "react";

export const useOnReceivedMessage = (callback, deps = []) => {
    const {subscription} = useCentrifugo();

    const handlePublication = (ctx) => {
        if (ctx.data.event !== 'create') {
            return;
        }
        const message = ctx.data.message;
        callback(message);
    };

    useEffect(() => {
        if (!subscription) {
            return
        }
        subscription.on('publication', handlePublication);


        return () => {
            subscription.off('publication', handlePublication);
        }

    }, [subscription, ...deps])
}