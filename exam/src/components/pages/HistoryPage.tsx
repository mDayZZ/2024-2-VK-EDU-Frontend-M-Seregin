import Container from "../UI/Container/Container.tsx";
import {useEffect, useState} from "react";
import {cache} from "../../services/translateService/translate/cache.ts";

const HistoryPage = () => {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const cachedHistory = cache.getHistory();

    }, [])

    return (
        <div>
            <Container>
                historyPage
            </Container>
        </div>
    );
};

export default HistoryPage;