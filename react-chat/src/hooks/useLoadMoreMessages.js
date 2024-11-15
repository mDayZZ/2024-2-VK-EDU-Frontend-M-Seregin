import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {messagesApi} from "../services/api/messages/index.js";

export const useLoadMoreMessages = ({messages, setMessages, chatId, isNextPage, setIsNextPage, mainRef}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const lastMessageRef = useRef(null);

    const loadMoreMessages = async () => {
        if (!isNextPage) {
           return;
        }
        const response = await messagesApi.getMessages(chatId, currentPage+1);
        const newMessages = response.results
        setMessages(prev => [...prev, ...newMessages]);
        setCurrentPage(prevState => prevState + 1);

        if (!response.next) {
            setIsNextPage(false);
        }
    }

    useLayoutEffect(() => {
        const targetElement = lastMessageRef.current;
        console.log(targetElement);
        if (!targetElement) {
            return;
        }

        const options = {
            rootMargin: '600px 0px 0px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            console.log('все ентрис: ', entries);
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMoreMessages();
                }
            });
        }, options);

        observer.observe(targetElement);

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        }
    }, [messages]);

    return [lastMessageRef];
}