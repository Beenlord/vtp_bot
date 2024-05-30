import DenoEnv from './modules/DenoEnv.ts';
import VtpTelegramBot from './core/VtpTelegramBot.ts';

await DenoEnv.setup();

const vtpBot = new VtpTelegramBot();
