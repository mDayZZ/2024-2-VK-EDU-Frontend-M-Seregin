import {useRef, useState} from "react";

export const useAttachFiles = () => {
    const [attachedFiles, setAttachedFiles] = useState([]);
    const fileInputRef = useRef(null);


    const onFileInputChange = (e) => {
        const files = e.target.files;
        const filesArray = Array.from(files);
        setAttachedFiles(prev => [...prev, ...filesArray]);
        fileInputRef.current.value = null;
    }

    const onDeleteAttachedFile = (index) => {
        setAttachedFiles(prev => prev.filter((file, fileIndex) => fileIndex !== index));


    }

    const onFilesSent = () => {
        setAttachedFiles([]);
    }



    return {attachedFiles, fileInputRef, onFileInputChange, onDeleteAttachedFile, onFilesSent};
}