import TelegramBot from "./TelegramBot.ts";

export default class VtpTelegramBot extends TelegramBot
{
    constructor() {
        super(Deno.env.get('VTP_BOT_TOKEN'));
    }
}