import { Bot, PollingOptions } from 'https://deno.land/x/grammy@v1.24.0/mod.ts';

export default class TelegramBot {
	protected bot: any;

	private token: string = '';
	private polling: PollingOptions = {};

	constructor(token: string | undefined, polling: PollingOptions = {}) {
		try {
			if (!token) {
				throw new Error('Bot token not exists..');
			}

			this.token = token;

			this.polling = {
				limit: 20,
				timeout: 30,
				drop_pending_updates: true,

				onStart: (botInfo) => {
					// console.log(Output.ok(`\nThe bot '${botInfo.username}' is running!\n`));
					// console.log(Output.ok(`test`));
				},

				...polling,
			};
		} catch (err) {
			console.error('Same error on init: ', err);
		}

		this.createBotInstance();
	}

	private createBotInstance() {
		this.bot = new Bot(this.token);
		this.bot.start(this.polling);
	}
}
