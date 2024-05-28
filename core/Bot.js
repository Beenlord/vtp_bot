import BotEvents from "./modules/BotEvents.js";

export default class Bot extends BotEvents
{
    bot;

    static createBotInstance(tgBotInstance) {
        this.bot = tgBotInstance({
            polling: true,
        });

        this.#createEvents();
    }

    static #createEvents() {
        this.bot.onText(/\/(.+)/, (msg, match) => {
            this.#callMethod(this.#parseMatch(match, 1), msg);
        })
        this.bot.onText(/\/(.+) (.+)/, (msg, match) => {
            this.#callMethod(this.#parseMatch(match, 2), msg);
        });
    }

	/**
	 * Метод для отправки сообщений по нужному id
	 * 
	 * @param {*} id ID Сообщения или объект telegram api
	 * @param {*} text Текст сообщения (можно в формате html)
	 */
	static sendMessage(id, text) {
		id && this.bot.sendMessage(id?.from?.id ?? id, text, {
			parse_mode: 'HTML',
		});
	}
    
    /**
     * Автономный метод для обработки
     * некорректных команд
     * 
     * @param {object} msg Объект telegram api
     */
    static undefined(msg) {
        this.sendMessage(msg, `Команда ${msg.text} отсутствует..`);
    }

    /* PRIVATE ZONE */

    static #parseMatch(match, len) {
        match = match.slice(1, len + 1);

        let method = 'undefined';
        let props = [];

        if (typeof this[match?.[0]] === 'function') {
            method = match[0];
            props = match.slice(1);
        }

        return {
            method,
            props,
        };
    }

    static #callMethod({ method, props }, msg) {
        return this?.[method](msg, ...props);
    }
}
