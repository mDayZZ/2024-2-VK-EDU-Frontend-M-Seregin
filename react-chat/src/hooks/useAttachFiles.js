import {useEffect, useRef, useState} from "react";

export const useAttachFiles = ({droppedFiles}) => {
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

    const onFilesDropped = () => {
        setAttachedFiles(prev => [...prev, ...droppedFiles]);
    }

    useEffect(() => {
        onFilesDropped();
    }, [droppedFiles]);



    return {attachedFiles, fileInputRef, onFileInputChange, onDeleteAttachedFile, onFilesSent};
}