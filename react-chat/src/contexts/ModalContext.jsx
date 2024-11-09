import {createContext, useContext, useState} from "react";
import Modal from "../components/UI/Modal/Modal.jsx";

export const ModalContext = createContext(null);

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [onEdit, setOnEdit] = useState(null);
    const openModal = (modalContent, headerTitle = null) => {
        setContent(modalContent);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
        setOnEdit(null);
    }



    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal, setOnEdit}}>
            {children}
            {isOpen &&
                <Modal isOpen={isOpen} onEdit={onEdit} onClose={closeModal} content={content} />
            }

        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext);
}