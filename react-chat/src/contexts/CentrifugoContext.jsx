import { createContext, useContext, useEffect, useState } from "react";
import { Centrifuge } from "centrifuge";
import {useSelector} from "react-redux";
import {authSelector} from "../store/auth/authSelectors.js";
import {centrifugoService} from "../services/api/centrifugoService.js";

const CentrifugoContext = createContext(null);

export const CentrifugoProvider = ({ children }) => {
    const {isAuthorized, user, loading, error} = useSelector(authSelector);

    const [centrifugo, setCentrifugo] = useState(null);
    const [subscription, setSubscription] = useState(null);

    const centrifugoConnection = () => {
        const centrifugeInstance = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
            getToken: async (ctx) => {
                try {
                    const response = await centrifugoService.getCentrifugoToken(ctx);
                    return response.token;
                } catch (error) {
                    console.error('Ошибка получения токена для подключения:', error);
                    throw new Error('Не удалось получить токен для подключения');
                }
            },
        });

        const newSubscription = centrifugeInstance.newSubscription(user.id, {
            getToken: async (ctx) => {
                try {
                    const response = await centrifugoService.getSubscribeToken(ctx);
                    return response.token;
                } catch (error) {
                    console.error('Ошибка получения токена для подписки:', error);
                    throw new Error('Не удалось получить токен для подписки');
                }
            }
        });

        newSubscription.on('publication', (ctx) => {
        });

        newSubscription.subscribe();
        centrifugeInstance.connect();

        setCentrifugo(centrifugeInstance);
        setSubscription(newSubscription);
    };

    useEffect(() => {
        if (isAuthorized && user) {
            centrifugoConnection();
        }

        return () => {
            if (centrifugo) {
                centrifugo.disconnect();
                setCentrifugo(null);
                setSubscription(null);
            }
        };
    }, [isAuthorized, user]);

    return (
        <CentrifugoContext.Provider value={{ subscription, centrifugo }}>
            {children}
        </CentrifugoContext.Provider>
    );
};

export const useCentrifugo = () => useContext(CentrifugoContext);
