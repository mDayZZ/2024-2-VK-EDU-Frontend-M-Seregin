    import {useState} from "react";

    export const useDragAndDropFiles = () => {
        const [droppedFiles, setDroppedFiles] = useState([]);
        const [isDragging, setIsDragging] = useState(false);

        const onDragEnter = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
        }

        const onDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
        }

        const onDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) {
                setIsDragging(true);
            }

        }

        const onDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            const fileList = e.dataTransfer.files;

            if (!fileList) {
                return;
            }
            let fileArray = Array.from(fileList);
            setDroppedFiles(fileArray);
        }

        const dragAndDropProps = {
            onDragEnter,
            onDragLeave,
            onDragOver,
            onDrop
        }


        return {droppedFiles, isDragging, dragAndDropProps};
    }
