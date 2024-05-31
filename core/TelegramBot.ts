import {
  Bot,
  type BotConfig,
  type BotInterface,
} from "https://deno.land/x/grammy@v1.24.0/mod.ts";

export default class TelegramBot {
  protected bot: BotInterface;

  constructor(token: string, config: BotConfig = {}) {
    this.bot = new Bot(token);
    this.bot.start(config);
  }
}
