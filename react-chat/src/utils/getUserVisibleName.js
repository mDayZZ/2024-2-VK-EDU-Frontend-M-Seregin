export const getUserVisibleName = (userInfo) => {
    if (!userInfo) {
        return;
    }
    const first_name = userInfo.first_name;
    const last_name = userInfo.last_name;
    const username = userInfo.username;
    const fullName = `${first_name} ${last_name}`.trim();

    return fullName || username || 'Неизвестный пользователь';
}