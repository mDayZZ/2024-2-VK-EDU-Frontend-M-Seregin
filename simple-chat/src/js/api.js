const users = [
    {id: '12', avatarUrl: './images/janne_avatar.jpg', username: 'Жанна Аркадьевна', status: 'В сети'},
    {id: '24', avatarUrl: './images/konst_avatar.jpeg', username: 'Константин', status: 'В сети'},
    {id: '26', avatarUrl: './images/shat_avatar.jpg', username: 'Максим Викторович', status: '2023-04-21T18:25:43-05:00'},
    {id: '31', avatarUrl: './images/jessee_avatar.jpg', username: 'Джесси Пинкман', status: '2024-04-21T18:25:43-05:00'},
]

const chats = [
    {
        id: '1',
        title: 'Дом Шаталиных',
        avatarUrl: './images/chat_avatar.jpeg',
        members: [{id: '12', role: 'member'}, {id: '24', role: 'member'}, {id: '26', role: 'admin'}],
        messages: [
            {id: '140', senderId: '12', messageText: 'Купи хлеба пж', datetime: '2023-04-21T18:25:43-05:00'},
            {id: '141', senderId: '24', messageText: 'Дорогая моя, я дворецкий, а не доставщик', datetime: '2023-04-21T18:41:43-04:12'},
            {id: '141', senderId: '26', messageText: 'Константин, в этом месяце работаете без зарплаты', datetime: '2023-04-21T20:13:10-04:12'},
            {id: '141', senderId: '31', messageText: 'Эйо, мистер Вайт, вы где? Не могу до вас дозвониться', datetime: '2024-02-21T22:13:10-04:12'},
            {id: '141', senderId: '24', messageText: 'Ты чатики перепутал', datetime: '2024-02-21T22:15:43-04:12'},
        ],
        isPublic: true,
    },
]

export const getUserById = (id) => {
    const user = new Promise( (resolve) => {
        setTimeout(() => {
            const user = users.filter(user => user.id === String(id))[0];
            if (!user) {
                resolve(null);
            }
            resolve (user);
        }, 30)
    })

    return user;
}

export const getChatById = (id) => {
    const chat = new Promise( (resolve) => {
        setTimeout(() => {
            const chat = chats.filter(chat => chat.id === String(id))[0];
            if (!chat) {
                resolve(null);
            }

            resolve(chat);
        }, 10)
    })
    return chat;
}