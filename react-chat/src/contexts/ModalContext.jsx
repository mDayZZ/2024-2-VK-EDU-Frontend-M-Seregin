import {createContext, useContext, useState} from "react";
import Modal from "../components/UI/Modal/Modal.jsx";

export const ModalContext = createContext(null);

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const openModal = (modalContent) => {
        setContent(modalContent);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    }

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
            {isOpen &&
                <Modal isOpen={isOpen} onClose={closeModal} content={content} />
            }

        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext);
}