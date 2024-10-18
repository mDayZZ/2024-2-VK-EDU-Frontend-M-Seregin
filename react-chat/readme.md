##Приложение поддерживает .env 

##Структура моковой БД
### users
| Column            | Type                            |
|-------------------|---------------------------------|
| id                | Number                          |
| username          | String                          |
| email             | String                          |
| profile_image_url | String                          |
| status            | 'online' \| 'offline' \| 'busy' |

### messages
| Column      | Type       |
|-------------|------------|
| id          | Number     |
| chat_id     | Number     |
| sender_id   | Number     |
| content     | String     |
| created_at  | String     |

### message_status
| Column     | Type                  |
|------------|-----------------------|
| message_id | Number                |
| user_id    | Number                |
| status     | 'delivered' \| 'read' |
| updated_at | String                |

### chats
| Column         | Type           |
|----------------|----------------|
| id             | Number         |
| is_group       | Boolean        |
| created_at     | String         |
| name           | String \| null |
| chat_image_url | String \| null |

### chat_members
| Column  | Type              |
|---------|-------------------|
| chat_id | Number            |
| user_id | Number            |
| role    | 'user' \| 'admin' |

