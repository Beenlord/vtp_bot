import { load } from 'https://deno.land/std@0.224.0/dotenv/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';

export default class Enviroment {
	public static async setup() {
		const env = await load();
		const args = parse(Deno.args);

		Object.entries(env).forEach(([key, value]) => {
			if (!Deno.env.has(key))
				Deno.env.set(key, value);
		});

		Object.entries(args).forEach(([key, value]) => {
			const KEY = key
				.replaceAll('-', '_')
				.toUpperCase();
			
			if (Deno.env.has(KEY))
				Deno.env.delete(KEY);
			
			Deno.env.set(KEY, String(value));
		});
	}
}
