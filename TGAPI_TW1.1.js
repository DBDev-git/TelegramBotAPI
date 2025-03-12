// @name Telegram Bot API
// @description Расширение которое позволяет взаимодействовать с Telegram API.
// @thumbnail https://github.com/DBDev-git/TelegramBotAPI/blob/main/Thumbnail%20for%20Telegram%20Bot%20API%20extension%20by%20@AnonimKingNews.png?raw=true
// @icon https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/768px-Telegram_2019_Logo.svg.png
// @id TelegramBotAPI
// @authors Telegram: @DBDev_IT, @MEOW_MUR920, @FXCHK404, thumbnail by @AnonimKingNews
// @version 1.1

(function (Scratch) {  
    'use strict';  

    if (!Scratch || !Scratch.BlockType) {  
        throw new Error('Scratch API недоступен. Расширение Telegram API невозиожно загрузить.');  
    }  

    if (!Scratch.extensions.unsandboxed) console.warn("Для быстрой работы рекомендуемый режим без песочницы, всё равно запускаем в песочнице.");

    class TelegramBotAPIExtension {  
        constructor() {  
            this.token = '';  
            this.updates = [];  
            this.offset = 0;  
            this.pollingActive = false;  
            this.allUsers = new Set();  
            this.recentUsers = [];  
            this.maxRecentUsers = 10;  
            this.lastCommand = "";
            this.inlineButtons = [];
        }  

        getInfo() {  
            return {  
                id: 'TelegramBotAPI',  
                name: 'Telegram Bot API',  
                menuIconURI: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/768px-Telegram_2019_Logo.svg.png",
                color1: '#0088CC',  
                color2: '#006699',  
                blocks: [  
                    {  
                        opcode: 'initBot',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'инициализировать бота с токеном [TOKEN]',  
                        arguments: { TOKEN: { type: Scratch.ArgumentType.STRING, defaultValue: 'ТОКЕН_БОТА' } }  
                    },  
                    {  
                        opcode: 'sendMessage',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'отправить сообщение [TEXT] в чат с ID [CHATID]',
                        arguments: {  
                            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Привет!' },  
                            CHATID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123456789 },
                        }  
                    }, 
                    {
                        opcode: "sendMessageWithInlineButtons",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "отправить сообщение [TEXT] с массивом кнопок [BUTTONS] -> JSON в чат с ID [CHATID]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Привет!"
                            },
                            BUTTONS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[{"text": "Кнопка 1", "callback_data": "data_1"}, {"text": "Кнопка 2", "url": "https://example.com"}]'
                            },
                            CHATID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123456789
                            }
                        }
                    },
                    {
                        opcode: "answerToMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "ответить [TEXT] на сообщение с ID [MESSAGEID] в чате с ID [CHATID]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Привет!"
                            },
                            MESSAGEID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            CHATID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123456789
                            }
                        }
                    },
                    {
                        opcode: "answerToMessageWithInlineButtons",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "ответить [TEXT] на сообщение с ID [MESSAGEID] с массивом кнопок [BUTTONS] -> JSON в чате с ID [CHATID]",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Привет!"
                            },
                            MESSAGEID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            BUTTONS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '[{"text": "Кнопка 1", "callback_data": "data_1"}, {"text": "Кнопка 2", "url": "https://example.com"}]'
                            },
                            CHATID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123456789
                            }
                        }
                    },
                    {  
                        opcode: 'sendPhoto',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'отправить фото [URL] в чат с ID [CHATID]',  
                        arguments: {  
                            URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com/photo.jpg' },  
                            CHATID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123456789 }  
                        }  
                    },
                    {
                        opcode: "editMessageText",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "изменить текст сообщения с ID [MESSAGEID] в чате с ID [CHATID] на [TEXT]",
                        arguments: {
                            MESSAGEID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            CHATID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123456789
                            },
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Привет!"
                            }
                        }
                    },
                    {
                        opcode: "deleteMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "удалить сообщение с ID [MESSAGEID] из чата с ID [CHATID]",
                        arguments: {
                            MESSAGEID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            CHATID: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 123456789
                            }
                        }
                    },
                    {  
                        opcode: 'startPolling',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'начать поллинг каждые [SECONDS] сек',  
                        arguments: { SECONDS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } }  
                    },  
                    {  
                        opcode: 'stopPolling',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'остановить поллинг'  
                    },  
                    {
                        opcode: "addInlineButtonDataToInlineButtonsArray",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "добавить кнопку [TEXT] с данными [DATA] в массив кнопок",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Кнопка 1"
                            },
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "data_1"
                            }
                        }
                    },
                    {
                        opcode: "addInlineButtonUrlToInlineButtonsArray",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "добавить кнопку [TEXT] с ссылкой [DATA] в массив кнопок",
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Кнопка 1"
                            },
                            DATA: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https//example.com"
                            }
                        }
                    },
                    {
                        opcode: "clearInlineButtonsArray",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "очистить массив кнопок"
                    },
                    {
                        opcode: "inlineButtonsArray",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "массив кнопок"
                    },
                    {  
                        opcode: 'getLastMessage',  
                        blockType: Scratch.BlockType.REPORTER,  
                        text: 'получить последнее сообщение'  
                    }, 
                    {
                        opcode: "getLastMessageID",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "получить ID последнего сообщения"
                    },
                    {  
                        opcode: 'getLastChatId',  
                        blockType: Scratch.BlockType.REPORTER,  
                        text: 'получить ID чата последнего сообщения'  
                    },  
                    {
                        opcode: "getLastCommand",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "получить последнюю команду"
                    },
                    {
                        opcode: "getLastCallbackData",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "получить последние данные коллбэка"
                    },
                    {  
                        opcode: 'hasNewMessages',  
                        blockType: Scratch.BlockType.BOOLEAN,  
                        text: 'есть новые сообщения?'  
                    },  
                    {  
                        opcode: 'isLastMessageIs',  
                        blockType: Scratch.BlockType.BOOLEAN,  
                        text: 'последнее сообщение - текст [TEXT]?',  
                        arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '/start' } }  
                    },  
                    {  
                        opcode: 'getLastUsername',  
                        blockType: Scratch.BlockType.REPORTER,  
                        text: 'получить имя пользователя последнего сообщения'  
                    },  
                    {  
                        opcode: 'getAllUsers',  
                        blockType: Scratch.BlockType.REPORTER,  
                        text: 'получить всех пользователей'  
                    },  
                    {  
                        opcode: 'getRecentUsers',  
                        blockType: Scratch.BlockType.REPORTER,  
                        text: 'получить последних пользователей'  
                    },  
                    {  
                        opcode: 'clearUpdates',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'очистить обновления'  
                    }  
                ]  
            };  
        }  

        initBot(args) {  
            this.token = args.TOKEN;  
            this.updates = [];  
            this.offset = 0;  
            this.pollingActive = false;  
            this.allUsers = new Set();  
            this.recentUsers = [];  
            this.lastCommand = "";
        }  

        async sendMessage(args) {  
            if (!this.token) return;  
            const url = `https://api.telegram.org/bot${this.token}/sendMessage`;  
            await fetch(url, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                    'Authorization': `Bearer ${this.token}` 
                },  
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    text: args.TEXT
                })  
            }).catch(error => console.error('Ошибка отправки сообщения:', error));  
        }  

        async sendMessageWithInlineButtons(args) {
            if (!this.token) return;
            const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    text: args.TEXT,
                    reply_markup: {
                        "inline_keyboard": [
                            JSON.parse(args.BUTTONS)
                        ]
                    }
                })
            }).catch(error => console.error("Ошибка отправки сообщения с инлайн-кнопками:", error));
        }

        async answerToMessage(args) {
            if (!this.token) return;
            const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    text: args.TEXT,
                    reply_to_message_id: args.MESSAGEID
                })
            }).catch(error => console.error("Ошибка отправки сообщения:", error));
        }

        async answerToMessageWithInlineButtons(args) {
            if (!this.token) return;
            const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    text: args.TEXT,
                    reply_to_message_id: args.MESSAGEID,
                    reply_markup: {
                        "inline_keyboard": [
                            JSON.parse(args.BUTTONS)
                        ]
                    }
                })
            }).catch(error => console.error("Ошибка ответа на сообщение с инлайн-кнопками:", error));
        }

        async sendPhoto(args) {  
            if (!this.token) return;  
            const url = `https://api.telegram.org/bot${this.token}/sendPhoto`;  
            await fetch(url, {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                    'Authorization': `Bearer ${this.token}` 
                },  
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    photo: args.URL
                })  
            }).catch(error => console.error('Ошибка отправки фото:', error));  
        }  

        async editMessageText(args) {
            if (!this.token) return;
            const url = `https://api.telegram.org/bot${this.token}/editMessageText`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    message_id: args.MESSAGEID,
                    text: args.TEXT
                })
            }).catch(error => console.error("Ошибка редактирования сообщения:", error));
        }

        async deleteMessage(args) {
            if (!this.token) return;
            const url = `https://api.telegram.org/bot${this.token}/deleteMessage`;
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    chat_id: args.CHATID,
                    message_id: args.MESSAGEID
                })
            }).catch(error => console.error("Ошибка удаления сообщения:", error));
        }

        startPolling(args) {  
            if (!this.token || this.pollingActive) return;  
            this.pollingActive = true;  
            const poll = () => {  
                if (!this.pollingActive) return;  
                const url = `https://api.telegram.org/bot${this.token}/getUpdates?offset=${this.offset}`;  
                fetch(url)  
                    .then(response => {  
                        if (!response.ok) {  
                            throw new Error(`Ошибка HTTP! Статус: ${response.status}`);  
                        }  
                        return response.json();  
                    })  
                    .then(data => {  
                        if (data.ok && data.result.length > 0) {  
                            this.updates = data.result;  
                            this.offset = this.updates[this.updates.length - 1].update_id + 1;  
                            this._updateUsers();  
                        }  
                        setTimeout(poll, args.SECONDS * 1000);  
                    })  
                    .catch(error => {  
                        console.error('Ошибка поллинга:', error);  
                        setTimeout(poll, args.SECONDS * 1000);  
                    });  
            };  
            poll();  
        }  

        stopPolling() {  
            this.pollingActive = false;  
        }  

        addInlineButtonDataToInlineButtonsArray(args) {
            this.inlineButtons.push({"text": args.TEXT, "callback_data": args.DATA});
        }

        addInlineButtonUrlToInlineButtonsArray(args) {
            this.inlineButtons.push({"text": args.TEXT, "url": args.DATA});
        }

        clearInlineButtonsArray() {
            this.inlineButtons = [];
        }

        inlineButtonsArray() {
            return JSON.stringify(this.inlineButtons);
        }

        getLastMessage() {  
            if (this.updates.length === 0) return '';  
            const lastUpdate = this.updates[this.updates.length - 1];  
            return lastUpdate.message ? lastUpdate.message.text || '' : '';  
        }  

        getLastMessageID() {
            if (this.updates.length === 0) return "";
            const lastUpdate = this.updates[this.updates.length - 1];
            return lastUpdate.message ? lastUpdate.message.message_id.toString() : "";
        }

        getLastChatId() {  
            if (this.updates.length === 0) return '';  
            const lastUpdate = this.updates[this.updates.length - 1];  
            return lastUpdate.message ? lastUpdate.message.chat.id.toString() : '';  
        }  

        getLastCommand() {
            if (this.updates.length === 0) return "";
            const lastUpdate = this.updates[this.updates.length - 1];
            const text = lastUpdate.message ? lastUpdate.message.text || "" : "";
            if (text.startsWith("/")) this.lastCommand = text.split(" ")[0];
            return this.lastCommand;
        }

        getLastCallbackData() {
            if (this.updates.length === 0) return "";
            const lastUpdate = this.updates[this.updates.length - 1];
            return lastUpdate.callback_query ? lastUpdate.callback_query.data || "" : "";
        }

        hasNewMessages() {  
            return this.updates.length > 0;  
        }  

        isLastMessageIs(args) {  
            if (this.updates.length === 0) return false;  
            const lastUpdate = this.updates[this.updates.length - 1];  
            const text = lastUpdate.message ? lastUpdate.message.text || '' : '';  
            return text === args.TEXT;  
        }  

        getLastUsername() {  
            if (this.updates.length === 0) return '';  
            const lastUpdate = this.updates[this.updates.length - 1];  
            return lastUpdate.message && lastUpdate.message.from  
                ? lastUpdate.message.from.username || lastUpdate.message.from.first_name || ''  
                : '';  
        }  

        getAllUsers() {  
            return Array.from(this.allUsers).join('; ');  
        }  

        getRecentUsers() {  
            return this.recentUsers.map(user => `${user.chatId}: ${user.username}`).join('; ');  
        }  

        async clearUpdates() {  
            this.updates = await [];  
            this.lastCommand = await "";
        }  

        async _updateUsers() {  
            this.updates.forEach(update => {
                if (update.message && update.message.from) {
                    const user = {
                        chatId: update.message.chat.id.toString(),
                        username: update.message.from.username || update.message.from.first_name || 'Unknown'
                    };
                    const userKey = `${user.chatId}:${user.username}`;
                    if (!this.allUsers.has(userKey)) {
                        this.allUsers.add(userKey);
                    }
                    this.recentUsers.push(user);
                    if (this.recentUsers.length > this.maxRecentUsers) {
                        this.recentUsers.shift();
                    }
                }
            });  
        }  
    }  
 
  
    Scratch.extensions.register(new TelegramBotAPIExtension());  
})(Scratch);  
