
//////////////////////////////////////////////////

export const initToLocalStorage = (key, value) => {
    const data = localStorage.getItem(key);
    if (data) {
        return;
    }
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItemFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export const saveItemToLocalStorage = (key, value) => {
    const data = JSON.stringify(value);
    return localStorage.setItem(key, data);
}

export const pushToLocalStorage = (key, value) => {
    const data = getItemFromLocalStorage(key);
    const newData = [...data, value];
    return saveItemToLocalStorage(key, newData);
}

