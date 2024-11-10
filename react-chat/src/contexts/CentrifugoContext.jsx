import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { Centrifuge } from "centrifuge";
import { centrifugoApi } from "../services/api/centrifugo/index.js";

const CentrifugoContext = createContext(null);

export const CentrifugoProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [centrifugo, setCentrifugo] = useState(null);
    const [subscription, setSubscription] = useState(null);

    const centrifugoConnection = () => {
        const centrifugeInstance = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
            getToken: async (ctx) => {
                try {
                    const response = await centrifugoApi.getCentrifugoToken(ctx);
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
                    const response = await centrifugoApi.getSubscribeToken(ctx);
                    return response.token;
                } catch (error) {
                    console.error('Ошибка получения токена для подписки:', error);
                    throw new Error('Не удалось получить токен для подписки');
                }
            }
        });

        newSubscription.on('publication', (ctx) => {
            console.log('Бу, испугался? НЕ бойся ', ctx.data);
        });

        newSubscription.subscribe();
        centrifugeInstance.connect();

        setCentrifugo(centrifugeInstance);
        setSubscription(newSubscription);
        console.log('коннекты были')
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            centrifugoConnection();
        }

        return () => {
            if (centrifugo) {
                centrifugo.disconnect();
                setCentrifugo(null);  // очищаем состояние
                setSubscription(null); // очищаем состояние
            }
        };
    }, [isAuthenticated, user]);

    return (
        <CentrifugoContext.Provider value={{ subscription, centrifugo }}>
            {children}
        </CentrifugoContext.Provider>
    );
};

export const useCentrifugo = () => useContext(CentrifugoContext);
