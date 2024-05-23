import { networkInterfaces } from "os";

export default class BotCommands
{
	static echo(msg, val) {
		this.conn?.createLog('call command', `Call command echo`);
		this.sendTemplatePost('blank');
	}

	static table(msg, table) {
		this.conn?.createLog('call command', `Call command and get table "${table}"`);
		if (table) {
			this.conn.selectAll(table).then((val) => {
				const els = val.map((el) => {
					return Object.entries(el);
				});

				this.sendTemplateMessage(msg, 'table', {
					table,
					els,
				});
			});
		} else {
			this.sendMessage(msg, 'Укажите таблицу /table users');
		}
	}

	static ip(msg) {
		this.conn?.createLog('call command', `Call command ${msg?.text}`, msg?.from?.username);

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

		this.sendTemplateMessage(msg, 'ip', {
			val: Object.values(results)?.[0]?.[0] ?? '-',
		});
	}

	static logs(msg, limit) {

		this.conn?.getLogs(+limit).then((res) => {
			const logs = res.reduce((acc, el) => {
				acc.push({...el, user: el?.user === '' ? 'unnamed' : el.user});
				return acc;
			}, []);
			
			this.sendTemplateMessage(msg, 'log', {
				limit,
				logs,
			});
		});
	}
}
