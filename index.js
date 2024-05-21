import 'dotenv/config';

const {
    TOKEN: tg_bot_token,
    CHANNEL: tg_channel,
    USER: tg_admin,
} = process.env;

import TelegramBot from 'node-telegram-bot-api';

//import Blank from './modules/Blank.js';

//const blank = new Blank();
//
//blank.write('std').then((val) => {
//    console.log(val);
//});

// const TelegramBot = require('node-telegram-bot-api');

 const bot = new TelegramBot(tg_bot_token, {
     polling: true,
 });

 bot.onText(/\echo (.+)/, (msg, match) => {
     bot.sendMessage(msg.from.id, match?.[1]);
 });

// bot.on("channel_post", (msg) => {
//     console.log(msg);
// });

// bot.sendMessage(tg_channel, `
// <b>Some title</b>
// Lorem ipsum
// `, {
//     parse_mode: 'HTML',
// });

// // bot.sendMessage(tg_channel, 'test');

