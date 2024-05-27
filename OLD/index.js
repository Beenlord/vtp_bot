import 'dotenv/config';

const {
	TOKEN: tg_bot_token,
	CHANNEL: tg_channel,
	ADMIN: tg_admin,
	DB_HOST: db_host,
	DB_USER: db_user,
	DB_PASS: db_pass,
	DB_NAME: db_name,
} = process.env;

import TelegramBot from 'node-telegram-bot-api';
import BotEvents from './modules/BotEvents.js';
import Query from './modules/Query.js';

BotEvents.setChannel(tg_channel);
BotEvents.setDatabse(() => {
	return new Query({
		host: db_host,
		user: db_user,
		password: db_pass,
		database: db_name,
	});
});

const bot = BotEvents.createEventHandler(() => {
	return new TelegramBot(tg_bot_token, {
		polling: true,
	});
});

//import Query from "./modules/Query.js";

//const db = new Query();

//db.selectAll('files').then((res) => {
//    console.log(res);
//});

//const dwn = new Downloader(dwn_folder);
//
//dwn.upload('https://habrastorage.org/r/w1560/files/7a4/ba0/3f1/7a4ba03f16584779add4d6da905c0cbc.png').then((res) => {
//	console.log(res);
//});

//

//const bot = new TelegramBot(tg_bot_token, {
//    polling: true,
//});

//let oneMinInterval = setInterval(() => {
//
//}, 60000);
//
//bot.onText(/\timeout (.+)/, (msg, match = 60000) => {
//
//});
//
//function makeInterval(cb, timeout = 60000) {
//    return setInterval();
//}

//import Blank from './modules/Blank.js';

//const blank = new Blank();
//
//blank.write('std').then((val) => {
//    console.log(val);
//});

// const TelegramBot = require('node-telegram-bot-api');

//telegramBot.onText(/\echo (.+)/, (msg, match) => {
//    bot.sendMessage(msg.from.id, match?.[1]);
//});

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

