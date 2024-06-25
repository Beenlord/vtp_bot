import TelegramBot from '@module/TelegramBot.ts';

export default class VtpTelegramBot extends TelegramBot {
	constructor() {
		super(Deno.env.get('BOT_TOKEN'));
		console.log('Launch - successful!');
	}
}
