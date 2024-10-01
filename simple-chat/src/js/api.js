const users = [
    {id: '12', avatarUrl: './images/janne_avatar.jpg', username: 'Жанна Аркадьевна', status: 'В сети'},
    {id: '24', avatarUrl: './images/konst_avatar.jpeg', username: 'Константин', status: 'В сети'},
    {id: '26', avatarUrl: './images/shat_avatar.jpg', username: 'Максим Викторович', status: '2023-04-21T18:25:43-05:00'},
    {id: '31', avatarUrl: './images/jessee_avatar.jpg', username: 'Джесси Пинкман', status: '2024-04-21T18:25:43-05:00'},
    {id: '32', avatarUrl: './images/saul_photo.png', username: 'Сол Гудман', status: '2024-04-21T18:25:43-05:00'},
    {id: '33', avatarUrl: './images/mrwhite_photo.png', username: 'Мистер Белый', status: '2024-04-21T18:25:43-05:00'},
    {id: '34', avatarUrl: './images/mike_photo.png', username: 'Майк (не брать)', status: '2024-04-21T18:25:43-05:00'},
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
            {id: '141', senderId: '24', messageText: 'Ты чатики перепутал', datetime: '2024-02-21T22:15:43-04:12'},
        ],
        isPublic: true,
    },
    {
        id: '34',
        title: 'juzBusiness',
        avatarUrl: './images/brba_chatphoto.png',
        members: [{id: '31', role: 'member'}, {id: '32', role: 'member'}, {id: '33', role: 'member'},  {id: '34', role: 'admin'}],
        messages: [
            {id: '141', senderId: '31', messageText: 'Эйо, мистер Вайт, вы где? Не могу до вас дозвониться', datetime: '2024-02-21T22:13:10-04:12'},
            {id: '142', senderId: '33', messageText: 'Джесси, сколько раз повторять? Я занят. Делай, как я сказал.', datetime: '2024-02-21T22:14:45-04:12'},
            {id: '143', senderId: '31', messageText: 'Мистер Вайт, ну это чушь. Я не робот, окей?', datetime: '2024-02-21T22:15:30-04:12'},
            {id: '144', senderId: '34', messageText: 'Перестаньте ныть. Всё будет по плану. Всегда.', datetime: '2024-02-21T22:16:00-04:12'},
            {id: '145', senderId: '32', messageText: 'Ребятки, зачем драматизировать? Все проблемы решаемы... если правильно подойти к делу. Платишь — и всё чисто.', datetime: '2024-02-21T22:17:25-04:12'},
            {id: '146', senderId: '31', messageText: 'Сол, ты о чём вообще? Это не помогает.', datetime: '2024-02-21T22:18:45-04:12'},
            {id: '147', senderId: '33', messageText: 'Слушайте Майка. И хватит обсуждать это в чате.', datetime: '2024-02-21T22:19:10-04:12'},
            {id: '148', senderId: '34', messageText: 'Да, я на связи. Но лучше бы не был.', datetime: '2024-02-21T22:20:00-04:12'},
            {id: '149', senderId: '31', messageText: 'Мистер Вайт, ну вы серьёзно? Он опять с "всегда".', datetime: '2024-02-21T22:21:00-04:12'},
            {id: '150', senderId: '33', messageText: 'Джесси. Делай.', datetime: '2024-02-21T22:22:10-04:12'},
            {id: '151', senderId: '32', messageText: 'Эх, ребятки, не могу на вас смотреть. Приходите ко мне, поговорим, как цивилизованные люди. Я все улажу.', datetime: '2024-02-21T22:23:25-04:12'}
        ],
        isPublic: true,
    },
    {
        id: '34',
        title: 'juzBusiness',
        avatarUrl: './images/brba_chatphoto.png',
        members: [{id: '31', role: 'member'}, {id: '32', role: 'member'}, {id: '33', role: 'member'},  {id: '34', role: 'admin'}],
        messages: [
            {id: '141', senderId: '31', messageText: 'Эйо, мистер Вайт, вы где? Не могу до вас дозвониться', datetime: '2024-02-21T22:13:10-04:12'},
            {id: '142', senderId: '33', messageText: 'Джесси, сколько раз повторять? Я занят. Делай, как я сказал.', datetime: '2024-02-21T22:14:45-04:12'},
            {id: '143', senderId: '31', messageText: 'Мистер Вайт, ну это чушь. Я не робот, окей?', datetime: '2024-02-21T22:15:30-04:12'},
            {id: '144', senderId: '34', messageText: 'Перестаньте ныть. Всё будет по плану. Всегда.', datetime: '2024-02-21T22:16:00-04:12'},
            {id: '145', senderId: '32', messageText: 'Ребятки, зачем драматизировать? Все проблемы решаемы... если правильно подойти к делу. Платишь — и всё чисто.', datetime: '2024-02-21T22:17:25-04:12'},
            {id: '146', senderId: '31', messageText: 'Сол, ты о чём вообще? Это не помогает.', datetime: '2024-02-21T22:18:45-04:12'},
            {id: '147', senderId: '33', messageText: 'Слушайте Майка. И хватит обсуждать это в чате.', datetime: '2024-02-21T22:19:10-04:12'},
            {id: '148', senderId: '34', messageText: 'Да, я на связи. Но лучше бы не был.', datetime: '2024-02-21T22:20:00-04:12'},
            {id: '149', senderId: '31', messageText: 'Мистер Вайт, ну вы серьёзно? Он опять с "всегда".', datetime: '2024-02-21T22:21:00-04:12'},
            {id: '150', senderId: '33', messageText: 'Джесси. Делай.', datetime: '2024-02-21T22:22:10-04:12'},
            {id: '151', senderId: '32', messageText: 'Эх, ребятки, не могу на вас смотреть. Приходите ко мне, поговорим, как цивилизованные люди. Я все улажу.', datetime: '2024-02-21T22:23:25-04:12'}
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

export const getChatsByUserId = (id) => {
    const promise = new Promise( (resolve, reject) => {
        setTimeout(() => {


            if (!chats) {
                reject(null);
            }
            resolve(chats);
        }, 20)
    })
    return promise;
}

export const postMessageByChatId = ({messageId, senderId, messageText, datetime}, chatId) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout( () => {
            const chat = chats.find(chat => Number(chat.id) === Number(chatId))

            if (!chat) {
                reject(null);
            }
            const message = {id: String(messageId), senderId: String(senderId), messageText: String(messageText), datetime: String(datetime)};
            chat.messages.push(message);
            resolve();
        }, 50)
    })

    return promise;
}