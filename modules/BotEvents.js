import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import BotCommands from "./BotCommands.js";

export default class BotEvents extends BotCommands
{
	static bot;
	static channel;

	static commandProc(match, msg) {
		match[1] && this?.[match[1]] && typeof this[match[1]] === 'function' && this[match[1]](msg, match[2] ?? null);
	}

	static createEventHandler(bot) {
		this.bot = bot();
		this.bot.onText(/\/(.+)/, (msg, match) => {
			this.commandProc(match, msg);
		});
		this.bot.onText(/\/(.+) (.+)/, (msg, match) => {
			this.commandProc(match, msg);
		});
		return this.bot;
	}

	static setChannel(channel_id) {
		this.channel = channel_id;
	}

	static sendMessage(msg, text) {
		this.bot.sendMessage(msg?.from?.id, text);
	}

	static sendPost(text, vars = null) {
		let value = text;
		if (vars) value = Handlebars.compile(text)(vars);
		this.channel && this.bot.sendMessage(this.channel, value, {
			parse_mode: 'HTML',
		});
	}

	static sendTemplatePost(tpl_name, vars = null) {
		tpl_name = `${tpl_name}.htm`;
		const path_to_file = path.join('tpls', tpl_name);
		if (fs.existsSync(path_to_file)) {
			const file_value = fs.readFileSync(path_to_file, 'utf8');
			this.sendPost(file_value, vars);
		}
	}
}
