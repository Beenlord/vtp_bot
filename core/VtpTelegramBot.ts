import TelegramBot from '@core/TelegramBot.ts';
// import Output from '@module/Output.ts';

export default class VtpTelegramBot extends TelegramBot {
	constructor() {
		super(Deno.env.get('BOT_TOKEN'));
		// Output.done('Бот запущен!');
	}
}
