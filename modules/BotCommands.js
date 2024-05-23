import { networkInterfaces } from "os";

export default class BotCommands
{
	static start(msg, val) {
		//this.sendTemplatePost('nasa', {
		//	val,
		//});
	}

	static ip(msg) {
		const nets = networkInterfaces();
		const results = Object.create(null);

		for (const name of Object.keys(nets)) {
			for (const net of nets[name]) {
				const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;

				if (net.family === familyV4Value && !net.internal) {
					if (!results[name]) results[name] = [];
					results[name].push(net.address);
				}
			}
		}

		this.sendMessage(msg, Object.values(results)?.[0]?.[0] ?? '-');
	}
}
