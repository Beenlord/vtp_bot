import 'dotenv/config';

import TelegramBot from 'node-telegram-bot-api';
import Query from './core/Query.js';
import Bot from './core/Bot.js';

Query.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

Bot.createBotInstance((opt) => {
    return new TelegramBot(process.env.TOKEN, opt);
});
