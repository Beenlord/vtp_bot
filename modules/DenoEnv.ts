import { load } from 'https://deno.land/std@0.224.0/dotenv/mod.ts';

export default class DenoEnv {
	public static async setup(): Promise {
		const env = await load();

		Object.entries(env).forEach(([key, value]) => {
			if (!Deno.env.has(key)) Deno.env.set(key, value);
		});
	}
}
