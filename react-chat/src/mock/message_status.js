const message_status = [
    // Уолтер и Джесси
    { message_id: 1, user_id: 2, status: 'delivered', updated_at: '2024-10-15 09:01' }, // Джесси получил сообщение от Уолтера
    { message_id: 2, user_id: 1, status: 'read', updated_at: '2024-10-15 09:03' }, // Уолтер прочитал сообщение от Джесси
    { message_id: 3, user_id: 2, status: 'read', updated_at: '2024-10-15 09:04' }, // Джесси прочитал следующее сообщение от Уолтера

    // Томми Шелби и Дейенерис
    { message_id: 10, user_id: 8, status: 'read', updated_at: '2024-10-13 10:03' }, // Дейенерис прочитала сообщение от Томми
    { message_id: 11, user_id: 3, status: 'read', updated_at: '2024-10-13 10:04' }, // Томми прочитал сообщение от Дейенерис

    // Тирион и Фрэнк
    { message_id: 12, user_id: 5, status: 'delivered', updated_at: '2024-10-13 11:01' }, // Фрэнк получил сообщение от Тириона
    { message_id: 13, user_id: 9, status: 'read', updated_at: '2024-10-13 11:06' }, // Тирион прочитал сообщение от Фрэнка
];
