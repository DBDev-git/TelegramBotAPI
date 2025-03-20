## Как создать Telegram-бота в Scratch?
<img src="https://github.com/DBDev-git/TelegramBotAPI/blob/fba37c610a31e1f1d8e87cb2cb0197efa1f18f5c/Thumbnail%20for%20Telegram%20Bot%20API%20extension%20by%20%40AnonimKingNews.png" alt="AnonimKingNews" width="300"/>
<img src="https://github.com/DBDev-git/TelegramBotAPI/blob/fba37c610a31e1f1d8e87cb2cb0197efa1f18f5c/Thumbnail%20for%20Telegram%20Bot%20API%20extension%20by%20%40FXCHK404.png" alt="FXCHK404" width="300"/>

***Вы наверно скажете невозможно, но я скажу что возможно***
##### ==============================
### @DBDev_IT, @MEOW_MUR920, @Fedor_sushko, @FXCHK404 разработали расширение, которое позволяет взаимодействовать с Telegram API (обложка от @AnonimKingNews)
##### ==============================
### Это расширение позволяет:
1. ***Отправлять сообщения в чат***
2. ***Отвечать на сообщения***
3. ***Inline-кнопки***
4. ***Удалять сообщения***
5. ***Изменять сообщения***
+ _И многое другое..._
#### ==============================
## Как настроить?
1. Скачайте [файл](https://github.com/DBDev-git/TelegramBotAPI/blob/main/TGAPI_TW1.2.js)
2. Откройте [мод Scratch'а](http://turbowarp.org/editor)
3. Нажмите на значок двух блоков с символов "+" (в правом нижнем углу)
4. Найдите и нажмите расширение "Пользовательское дополнение"
5. Перейдите в раздел "Файл"
6. Загрузите скачанный файл
7. Необязательно: Поставьте галочку "Запустить без песочницы" (Run without sandbox)
8. Нажмите на кнопку "Загрузить" (Load)
9. Расширение должно появиться в левой панели категорий
#### ==============================
[Let's create!|DBDev](http://t.me/DBDev_IT_channel) x https://t.me/MEOW_MUR920, https://t.me/Fedor_sushko, https://t.me/FXCHK404, https://t.me/AnonimKingNews

## Команды

### `инициализировать бота с токеном [TOKEN]`
Инициализирует бота с указанным токеном.
- **TOKEN**: строка, токен вашего бота.

### `начать поллинг каждые [SECONDS] сек`
Начинает поллинг обновлений с указанным интервалом.
- **SECONDS**: число, интервал в секундах.

### `остановить поллинг`
Останавливает поллинг обновлений.

### `отправить сообщение [TEXT] в чат с ID [CHATID]`
Отправляет сообщение в указанный чат.
- **TEXT**: строка, текст сообщения.
- **CHATID**: число, ID чата.

### `отправить сообщение [TEXT] с массивом кнопок [BUTTONS] -> JSON в чат с ID [CHATID]`
Отправляет сообщение с инлайн-кнопками в указанный чат.
- **TEXT**: строка, текст сообщения.
- **BUTTONS**: строка, JSON массив кнопок.
- **CHATID**: число, ID чата.

### `ответить [TEXT] на сообщение с ID [MESSAGEID] в чате с ID [CHATID]`
Отправляет ответ на указанное сообщение.
- **TEXT**: строка, текст ответа.
- **MESSAGEID**: число, ID сообщения.
- **CHATID**: число, ID чата.

### `ответить [TEXT] на сообщение с ID [MESSAGEID] с массивом кнопок [BUTTONS] -> JSON в чате с ID [CHATID]`
Отправляет ответ с инлайн-кнопками на указанное сообщение.
- **TEXT**: строка, текст ответа.
- **MESSAGEID**: число, ID сообщения.
- **BUTTONS**: строка, JSON массив кнопок.
- **CHATID**: число, ID чата.

### `отправить фото [URL] в чат с ID [CHATID]`
Отправляет фото в указанный чат.
- **URL**: строка, URL фото.
- **CHATID**: число, ID чата.

### `отправить опрос с вопросом [QUESTION] и с массивом вариантов ответа [OPTIONS] с настройками [ISANONIM] и [ALLOWSMULTIPLE] в чат с ID [CHATID]`
Отправляет опрос в указанный чат.
- **QUESTION**: строка, текст вопроса.
- **ISANONIM**: строка, анонимность опроса.
- **ALLOWSMULTIPLE**: строка, возможность множественного выбора.
- **OPTIONS**: строка, JSON массив вариантов ответа.
- **CHATID**: число, ID чата.

### `отправить покупку с названием [TITLE] и описанием [DESCRIPTION] и с токеном провайдера [PROVIDER_TOKEN] с валютой [CURRENCY] и ценой [PRICE] в чат с ID [CHATID]`
Отправляет запрос на покупку в указанный чат.
- **TITLE**: строка, название покупки.
- **DESCRIPTION**: строка, описание покупки.
- **PROVIDER_TOKEN**: строка, токен провайдера.
- **CURRENCY**: строка, валюта.
- **PRICE**: число, цена.
- **CHATID**: число, ID чата.

### `изменить текст сообщения с ID [MESSAGEID] в чате с ID [CHATID] на [TEXT]`
Изменяет текст указанного сообщения.
- **MESSAGEID**: число, ID сообщения.
- **CHATID**: число, ID чата.
- **TEXT**: строка, новый текст сообщения.

### `удалить сообщение с ID [MESSAGEID] из чата с ID [CHATID]`
Удаляет указанное сообщение.
- **MESSAGEID**: число, ID сообщения.
- **CHATID**: число, ID чата.

### `кикнуть пользователя с ID [USERID] в чате с ID [CHATID]`
Кикает пользователя из указанного чата.
- **USERID**: число, ID пользователя.
- **CHATID**: число, ID чата.

### `замутить пользователя с ID [USERID] в чате с ID [CHATID]`
Мутит пользователя в указанном чате.
- **USERID**: число, ID пользователя.
- **CHATID**: число, ID чата.

### `размутить пользователя с ID [USERID] в чате с ID [CHATID]`
Размутит пользователя в указанном чате.
- **USERID**: число, ID пользователя.
- **CHATID**: число, ID чата.

### `забанить пользователя с ID [USERID] в чате с ID [CHATID]`
Банит пользователя в указанном чате.
- **USERID**: число, ID пользователя.
- **CHATID**: число, ID чата.

### `разбанить пользователя с ID [USERID] в чате с ID [CHATID]`
Разбанивает пользователя в указанном чате.
- **USERID**: число, ID пользователя.
- **CHATID**: число, ID чата.

### `поставить реакцию [REACTION] на сообщение с ID [MESSAGEID] в чате с ID [CHATID]`
Ставит реакцию на указанное сообщение.
- **REACTION**: строка, реакция.
- **MESSAGEID**: число, ID сообщения.
- **CHATID**: число, ID чата.

### `добавить кнопку с текстом [TEXT] и типом [TYPE] с данными [DATA] в массив кнопок`
Добавляет кнопку в массив инлайн-кнопок.
- **TEXT**: строка, текст кнопки.
- **TYPE**: строка, тип кнопки.
- **DATA**: строка, данные кнопки.

### `добавить вариант ответа с текстом [TEXT] в массив вариантов ответа`
Добавляет вариант ответа в массив вариантов ответа.
- **TEXT**: строка, текст варианта ответа.

### `очистить массив [CLEAR_ARRAY]`
Очищает указанный массив.
- **CLEAR_ARRAY**: строка, массив для очистки.

### `массив [ARRAY]`
Возвращает указанный массив в виде строки JSON.
- **ARRAY**: строка, массив для возврата.

### `получить [GETMESSAGE_TYPE] последнего сообщения`
Возвращает указанное свойство последнего сообщения.
- **GETMESSAGE_TYPE**: строка, тип свойства.

### `получить [GETCALLBACK_TYPE] коллбэка`
Возвращает указанное свойство последнего коллбэка.
- **GETCALLBACK_TYPE**: строка, тип свойства.

### `ответить на коллбэк с ID [ID] с типом [TYPE] и текстом [TEXT]`
Отправляет ответ на указанный коллбэк.
- **ID**: число, ID коллбэка.
- **TYPE**: строка, тип ответа.
- **TEXT**: строка, текст ответа.

### `есть новые сообщения?`
Возвращает `true`, если есть новые сообщения.

### `последнее сообщение - начинается с [TEXT]?`
Возвращает `true`, если последнее сообщение начинается с указанного текста.
- **TEXT**: строка, текст для проверки.

### `получить всех пользователей`
Возвращает всех пользователей.

### `получить последних пользователей`
Возвращает последних пользователей.

### `когда получено новое сообщение`
Событие, которое срабатывает при получении нового сообщения.

### `когда получены новые данные коллбэка`
Событие, которое срабатывает при получении новых данных коллбэка.

### `очистить обновления`
Очищает все обновления.

## Меню

### INLINE_BUTTONS_ARRAY_TYPE_MENU
- "данные"
- "ссылка"

### CALLBACK_ANSWER_TYPE_MENU
- "уведомление"
- "предупреждение"

### GETMESSAGE_TYPE_MENU
- "текст"
- "ID"
- "ID чата"
- "команду"
- "имя пользователя"
- "ID пользователя"

### GETCALLBACK_TYPE_MENU
- "данные"
- "ID"
- "ID чата"
- "имя пользователя"
- "ID пользователя"

### POLL_ISANONIM_MENU
- "анонимный"
- "не анонимный"

### POLL_ALLOWSMULTIPLE_MENU
- "поддерживающий несколько ответов"
- "не поддерживающий несколько ответов"

### REACTION_MENU
- "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡"

### CLEAR_ARRAY_MENU
- "инлайн-кнопок"
- "вариантов ответа"

### ARRAY_MENU
- "инлайн-кнопок"
- "вариантов ответа"
