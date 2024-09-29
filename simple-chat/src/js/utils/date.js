export const getDatetime = (datetime) => {
    const dateNow = new Date();

    if (!datetime) {
        return null;
    }

    const date = new Date(datetime);
    const day = String(date.getDate()); // День
    const month = date.toLocaleString('default', { month: 'short' });
    const year = String(date.getFullYear());
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    if (dateNow.getFullYear() !== date.getFullYear()) {
        return `${day} ${month} ${year} ${time}`
    }

    let formattedDate = [];
    formattedDate.push(time);

    if (dateNow.getDate() !== date.getDate() || dateNow.getMonth() !== date.getMonth()) {
        formattedDate.unshift(month);
        formattedDate.unshift(day);
    }

    return formattedDate.join(' ');
}