import {useSelector} from "react-redux";
import {authSelector} from "../store/auth/authSelectors.js";
import {useEffect, useRef, useState} from "react";
import {getPagesCount} from "../utils/getPagesCount.js";
import {useFetch} from "./useFetch.js";

/**
 * Хук для реализации динамической пагинации с использованием Intersection Observer.
 *
 * @param {Function} setElementsState - Функция для обновления состояния элементов (например, чатов).
 * @param {Array} elementState - Текущее состояние списка элементов.
 * @param {Function} apiRequest - Функция API для получения данных. Принимает объект с параметром `page` и возвращает Promise с объектом, содержащим `count` (общее количество элементов) и `results` (массив данных).
 * @returns {[React.MutableRefObject, boolean]} - Массив, содержащий:
 *  - `lastElementRef` - ref для последнего элемента списка, который отслеживает Intersection Observer.
 *  - `isFetching` - состояние загрузки данных.
 *
 * @example
 * const [lastElementRef, isLoading] = useDynamicPagination(setItems, items, apiService.getItems);
 *
 * useEffect(() => {
 *   // Логика для работы с состоянием isLoading, если необходимо.
 * }, [isLoading]);
 *
 * return (
 *   <ul>
 *     {items.map((item, index) => (
 *       <li
 *         ref={index === items.length - 1 ? lastElementRef : null}
 *         key={item.id}
 *       >
 *         {item.name}
 *       </li>
 *     ))}
 *   </ul>
 * );
 */
export const useDynamicPagination = (setElementsState, elementState, apiRequest) => {
    const { user } = useSelector(authSelector);
    const lastElementRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsCount, setElementsCount] = useState(0);
    const [isFetching, setIsFetching] = useState(false); // Управление загрузкой
    const maxPage = getPagesCount(elementsCount, 10);

    const [fetchConversations] = useFetch(async (page) => {
        if (isFetching || page > maxPage) return;

        setIsFetching(true);
        try {
            const { count, results } = await apiRequest({page});
            setElementsCount(count);
            setElementsState((prevState) => [...prevState, ...results]);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching conversations:', error);
        } finally {
            setIsFetching(false);
        }
    });

    useEffect(() => {
        if (!user?.id) return;
        fetchConversations(1);
    }, [user?.id]);

    useEffect(() => {
        if (!lastElementRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            const lastEntry = entries[entries.length - 1];
            if (lastEntry.isIntersecting && currentPage < maxPage) {
                fetchConversations(currentPage + 1);
            }
        });

        const currentElement = lastElementRef.current;
        observer.observe(currentElement);

        return () => {
            observer.unobserve(currentElement);
        };
    }, [currentPage, maxPage]);

    return [lastElementRef, isFetching];
};

