import React from 'react';
import Container from "../UI/Container/Container.jsx";
import Translator from "../Translator/Translator.jsx";
import Section from "../UI/Section/Section.jsx";

const TranslatePage = () => {



    return (
        <div>
            <Section>
                <Container>
                    <Translator/>
                </Container>
            </Section>
        </div>
    );
};

export default TranslatePage;