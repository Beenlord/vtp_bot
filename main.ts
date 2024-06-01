import Enviroment from '@module/Enviroment.ts';
import VtpTelegramBot from '@core/VtpTelegramBot.ts';

await Enviroment.setup();

const vtpBot = new VtpTelegramBot();
