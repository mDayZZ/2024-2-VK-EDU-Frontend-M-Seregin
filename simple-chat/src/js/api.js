const users = [
    {id: '12', avatarUrl: './images/janne_avatar.jpg', username: 'Жанна Аркадьевна', status: 'В сети'},
    {id: '24', avatarUrl: './images/konst_avatar.jpeg', username: 'Константин', status: 'В сети'},
    {id: '26', avatarUrl: './images/shat_avatar.jpg', username: 'Максим Викторович', status: '2023-04-21T18:25:43-05:00'},
    {id: '31', avatarUrl: './images/thomas_shelby_avatar.png', username: 'Томас Шелби', status: 'В сети'},
    {id: '32', avatarUrl: './images/artur_shelby_avatar.jpg', username: 'Артур Шелби', status: '2024-04-21T18:25:43-05:00'},
    {id: '33', avatarUrl: './images/fiona_galagher_avatar.jpg', username: 'Фиона Галлагер', status: 'В сети'},
    {id: '34', avatarUrl: './images/frank_galagher_avatar.jpg', username: 'Фрэнк Галлагер', status: '2024-04-21T18:25:43-05:00'},
    {id: '35', avatarUrl: './images/lip_galagher_avatar.jpg', username: 'Лип Галлагер', status: 'В сети'},

    // Измененные данные Breaking Bad
    {id: '1001', avatarUrl: './images/jessee_avatar.jpg', username: 'Джесси Пинкман', status: '2024-04-21T18:25:43-05:00'},
    {id: '1002', avatarUrl: './images/saul_photo.png', username: 'Сол Гудман', status: '2024-04-21T18:25:43-05:00'},
    {id: '1003', avatarUrl: './images/mrwhite_photo.png', username: 'Мистер Белый', status: '2024-04-21T18:25:43-05:00'},
    {id: '1004', avatarUrl: './images/mike_photo.png', username: 'Майк (не брать)', status: '2024-04-21T18:25:43-05:00'},
];

const chats = [
    {
        id: '1',
        title: 'Дом Шаталиных',
        avatarUrl: './images/chat_avatar.jpeg',
        members: [{id: '12', role: 'member'}, {id: '24', role: 'member'}, {id: '26', role: 'admin'}],
        messages: [
            {id: '140', senderId: '12', messageText: 'Купи хлеба пж', datetime: '2023-04-21T18:25:43-05:00'},
            {id: '141', senderId: '24', messageText: 'Дорогая моя, я дворецкий, а не доставщик', datetime: '2023-04-21T18:41:43-04:12'},
            {id: '142', senderId: '26', messageText: 'Константин, в этом месяце работаете без зарплаты', datetime: '2023-04-21T20:13:10-04:12'},
        ],
        isPublic: true,
    },
    {
        id: '35',
        title: 'Шелби Компани лимитед.',
        avatarUrl: './images/peaky_blinders_chat.png',
        members: [{id: '31', role: 'admin'}, {id: '32', role: 'member'}],
        messages: [
            {id: '141', senderId: '31', messageText: 'Артур, нам нужно организовать дело с ирландцами', datetime: '2024-02-21T22:13:10-04:12'},
            {id: '142', senderId: '32', messageText: 'Томми, ты уверен, что это стоит того?', datetime: '2024-02-21T22:14:45-04:12'},
            {id: '143', senderId: '31', messageText: 'Я как томас шелби пррр', datetime: '2024-02-21T22:15:30-04:12'},
            {id: '143', senderId: '31', messageText: 'Пригласи в чат остальных кепочек', datetime: '2024-02-21T22:15:31-04:12'},
        ],
        isPublic: true,
    },
    {
        id: '36',
        title: 'Семья Галлахеров',
        avatarUrl: './images/shameless_chat.jpg',
        members: [{id: '33', role: 'admin'}, {id: '34', role: 'member'}, {id: '35', role: 'member'}],
        messages: [
            {id: '201', senderId: '33', messageText: 'Фрэнк, ты опять не платил за свет?', datetime: '2024-04-21T22:13:10-04:12'},
            {id: '202', senderId: '34', messageText: 'Свет — это буржуазное зло, к чему вся эта суета?', datetime: '2024-04-21T22:14:30-04:12'},
            {id: '203', senderId: '35', messageText: 'Фи, не волнуйся. Я завтра решу с этим, окей?', datetime: '2024-04-21T22:15:45-04:12'},
        ],
        isPublic: true,
    },

    // Измененные данные Breaking Bad
    {
        id: '1005',
        title: 'juzBusiness',
        avatarUrl: './images/brba_chatphoto.png',
        members: [{id: '1001', role: 'member'}, {id: '1002', role: 'member'}, {id: '1003', role: 'member'}, {id: '1004', role: 'admin'}],
        messages: [
            {id: '141', senderId: '1001', messageText: 'Эйо, мистер Вайт, вы где? Не могу до вас дозвониться', datetime: '2024-02-21T22:13:10-04:12'},
            {id: '142', senderId: '1003', messageText: 'Джесси, сколько раз повторять? Я занят. Делай, как я сказал.', datetime: '2024-02-21T22:14:45-04:12'},
            {id: '143', senderId: '1001', messageText: 'Мистер Вайт, ну это чушь. Я не робот, окей?', datetime: '2024-02-21T22:15:30-04:12'},
            {id: '144', senderId: '1004', messageText: 'Захлопнитесь, и перестаньте спамить', datetime: '2024-02-21T22:16:00-04:12'},
            {id: '145', senderId: '1002', messageText: 'Джесси, ты планируешь платить? Я тебе Майка нашёл', datetime: '2024-02-21T22:17:25-04:12'},
            {id: '146', senderId: '1001', messageText: 'Какая ты жадная козлина, Сол', datetime: '2024-02-22T22:18:45-04:12'},
            {id: '145', senderId: '1002', messageText: 'Пацан, на тебе свет клином не сошёлся. Мне семью кормить', datetime: '2024-02-21T22:19:25-04:12'},
            {id: '144', senderId: '1004', messageText: ')))0)', datetime: '2024-02-21T22:16:00-04:12'},



        ],
        isPublic: true,
    }
];

export const getUserById = (id) => {
    const user = new Promise((resolve) => {
        setTimeout(() => {
            const user = users.filter(user => user.id === String(id))[0];
            if (!user) {
                resolve(null);
            }
            resolve(user);
        }, 30);
    });

    return user;
}

export const getChatById = (id) => {
    const chat = new Promise((resolve) => {
        setTimeout(() => {
            const chat = chats.filter(chat => chat.id === String(id))[0];
            if (!chat) {
                resolve(null);
            }

            resolve(chat);
        }, 10);
    });
    return chat;
}

export const getChatsByUserId = (id) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!chats) {
                reject(null);
            }
            resolve(chats);
        }, 20);
    });
    return promise;
}

export const postMessageByChatId = ({messageId, senderId, messageText, datetime}, chatId) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const chat = chats.find(chat => Number(chat.id) === Number(chatId))

            if (!chat) {
                reject(null);
            }
            const message = {id: messageId, senderId, messageText, datetime};
            chat.messages.push(message);

            resolve(chat);
        }, 30);
    });
    return promise;
}
