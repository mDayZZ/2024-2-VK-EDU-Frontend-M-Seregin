import {useState} from "react";

export const useAttachFiles = () => {
    const [attachedFiles, setAttachedFiles] = useState([]);

    return {attachedFiles};
}