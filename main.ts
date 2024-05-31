import DenoEnv from '@module/DenoEnv.ts';
import VtpTelegramBot from '@core/VtpTelegramBot.ts';

await DenoEnv.setup();

const vtpBot = new VtpTelegramBot();
