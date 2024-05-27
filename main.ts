import { config } from "https://deno.land/x/dotenv/mod.ts"
import Bot from "./modules/Bot.ts"

const env = config();

Bot.createInstance(env.TOKEN);
