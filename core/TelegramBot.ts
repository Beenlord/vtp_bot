import {
  Bot,
  type PollingOptions,
} from "https://deno.land/x/grammy@v1.24.0/mod.ts";

import Cls from "@module/Cls.ts";

export default class TelegramBot {
  protected bot: any;

  private token: string = "";
  private polling: PollingOptions = {};

  constructor(token: string | undefined, polling: PollingOptions = {}) {
    try {
      if (!token)
        throw new Error('Отсутствует токен!');

      this.token = token;

      this.polling = {
        limit: 20,
        timeout: 30,
        drop_pending_updates: true,
  
        onStart: (botInfo) => {
          // console.log(Cls.ok(`\nThe bot '${botInfo.username}' is running!\n`));
          console.log(Cls.ok(`test`));
        },
        
        ...polling,
      };
      
    } catch(err) {
      Cls.err();
    }

    this.createBotInstance();
  }

  private createBotInstance() {
      this.bot = new Bot(this.token);
      this.bot.start(this.polling);
  }
}
