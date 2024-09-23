const users = [
    {id: '12', avatarUrl: './images/janne_avatar.jpg', username: 'Жанна Аркадьевна', status: 'В сети'},
    {id: '24', avatarUrl: './images/konst_avatar.jpeg', username: 'Константин', status: 'В сети'},
    {id: '26', avatarUrl: './images/shat_avatar.jpg', username: 'Максим Викторович', status: '2023-04-21T18:25:43-05:00'},
]

const chats = [
    {
        id: '1',
        title: 'Дом Шаталиных',
        avatarUrl: './images/chat_avatar.jpeg',
        users: [{id: '12', role: 'member'}, {id: '24', role: 'member'}, {id: '26', role: 'admin'}],
        messages: [
            {id: '140', senderId: '12', messageText: 'Купи хлеба пж', datetime: '2023-04-21T18:25:43-05:00'},
            {id: '141', senderId: '24', messageText: 'Дорогая моя, я дворецкий, а не доставщик', datetime: '2023-04-21T18:41:43-04:12'},
            {id: '141', senderId: '26', messageText: 'Константин, в этом месяце работаете без зарплаты', datetime: '2023-04-21T20:13:10-04:12'},
        ],
        isPublic: true,
    },
]



export const getUserById = (id) => {
    return JSON.stringify(users.filter(user => user.id === String(id))[0]);
}

export const getChatById = (id) => {
    return JSON.stringify(chats.filter(chat => chat.id === String(id))[0]);
}