export const getShortFilename = (fileName, MAX_NAME_LENGTH = 10) => {
    if (typeof fileName !== 'string') {
        console.error('getShortFilename requires string string');
        return;
    }

    if (fileName.length > MAX_NAME_LENGTH) {
        const splittedFileName = fileName.split('.');
        const name = splittedFileName[0];
        const extension = splittedFileName.length > 1 ? splittedFileName[splittedFileName.length-1] : null;
        if (!extension) {
            return `${fileName.slice(0, MAX_NAME_LENGTH)}...`;
        }
        const firstName = name.slice(0, Math.floor(MAX_NAME_LENGTH / 2) - extension.length);
        const secondName = name.slice(name.length - Math.floor(MAX_NAME_LENGTH / 2), name.length);
        const newFileName = `${firstName}...${secondName}.${extension}`;
        return newFileName
    }
    return fileName
}