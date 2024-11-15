import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {messagesApi} from "../services/api/messages/index.js";

export const useLoadMoreMessages = ({messages, setMessages, chatId, isNextPage, setIsNextPage, mainRef}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const lastMessageRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
    }

    useLayoutEffect(() => {
        const targetElement = lastMessageRef.current;
        if (!targetElement) {
            return;
        }

        const options = {
            rootMargin: '600px 0px 0px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsLoading(true);
                    // loadMoreMessages();
                    if (mainRef.current.scrollTop === 0) {
                        mainRef.current.scrollTop = 900;
                    }

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

    useEffect(() => {
        if (isLoading) {
            loadMoreMessages();
        }
    }, [isLoading]);

    return [lastMessageRef];
}