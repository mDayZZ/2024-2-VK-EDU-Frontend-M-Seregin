export const getFileExtensionByUrl = (fileUrl) => {
    if (!fileUrl || typeof fileUrl !== 'string') {
        console.error('bad fileUrl in getFileTypeByUrl');
        return null;
    }
    const separatedUrl = fileUrl.split('.');
    if (separatedUrl.length < 2) {
        return null;
    }

    return separatedUrl[separatedUrl.length - 1];
}

export const getFileTypeByUrl =(fileUrl) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

    const extension = getFileExtensionByUrl(fileUrl);
    if (!extension) {
        return null;
    }
    if (imageExtensions.includes(extension)) {
        return 'image';
    }

    return 'file';
};

export const getFileName = (fileUrl) => {
    if (!fileUrl || typeof fileUrl !== 'string') {
        console.error('bad fileUrl in getFileTypeByUrl');
        return null;
    }

    const separatedUrl = fileUrl.split('/');

    return separatedUrl[separatedUrl.length - 1];
}