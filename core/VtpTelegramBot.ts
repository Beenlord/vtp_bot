import TelegramBot from '@module/TelegramBot.ts';

export default class VtpTelegramBot extends TelegramBot {

	constructor() {
		super(Deno.env.get('TOKEN'));
		console.log('Launch - successful!');
	}

	async default(ctx) {
	}

	async test(ctx) {
		await ctx.reply("Ok!");
	}
}
