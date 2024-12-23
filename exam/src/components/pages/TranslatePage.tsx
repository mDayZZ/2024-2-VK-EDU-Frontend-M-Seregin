import Button from "../UI/Button/Button.tsx";
import {History} from "@mui/icons-material";
import Header from "../Header/Header.tsx";
import Translator from "../Translator/Translator.tsx";
import Container from "../UI/Container/Container.tsx";
import {useState} from "react";

const TranslatePage = () => {

    const [history, setHistory] = useState([]);



    return (
        <div>
            <Container>
                <Translator/>
            </Container>

        </div>
    );
};

export default TranslatePage;