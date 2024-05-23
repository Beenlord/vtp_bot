import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import BotCommands from "./BotCommands.js";

export default class BotEvents extends BotCommands
{
	static bot;
	static channel;
	static conn;

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

	static setDatabse(conn) {
		if (!this.conn) this.conn = conn() ?? null;
	}

	/**
	 * Метод для отправки сообщений по нужному id
	 * 
	 * @param {*} id ID Сообщения или объект telegram api
	 * @param {*} msg Текст сообщения (можно в формате html)
	 */
	static sendMessage(id, msg) {
		id && this.bot.sendMessage(id?.from?.id ?? id, msg, {
			parse_mode: 'HTML',
		});
	}

	/**
	 * Обёртка над sendMessage для
	 * отпарвки соообщений по шаблону
	 * 
	 * @param {number|object} id ID Сообщения или объект telegram api
	 * @param {string} tpl Имя шаблона из папки tpls
	 * @param {object} vars Переменные для шаблона Handlebars
	 */
	static sendTemplateMessage(id, tpl, vars = {}) {
		tpl = this.getTemplate(tpl);
		tpl = Handlebars.compile(tpl)(vars);
		this.sendMessage(id, tpl);
	}

	/**
	 * Отправка сообщений в канал
	 * 
	 * @param {string} msg Текст сообщения (можно в формате html)
	 */
	static sendPost(msg) {
		this.channel && this.sendMessage(this.channel, msg);
	}

	/**
	 * Обёрка над sendTemplateMessage для
	 * отправки сообщений в канал по шаблону
	 * 
	 * @param {string} tpl Имя шаблона из папки tpls
	 * @param {object} vars Переменные для шаблона Handlebars
	 */
	static sendTemplatePost(tpl, vars = {}) {
		this.channel && this.sendTemplateMessage(this.channel, tpl, vars);
	}

	/**
	 * Метод получения шаблона из папки
	 * tpls по названию
	 * 
	 * @param {string} tpl Имя шаблона из папки tpls
	 * @returns Содержимое файла шаблона
	 */
	static getTemplate(tpl) {
		tpl = `${tpl}.htm`;
		const path_to_file = path.join('tpls', tpl);
		if (fs.existsSync(path_to_file)) {
			return fs.readFileSync(path_to_file, 'utf8');
		}
		return '';
	}
}
