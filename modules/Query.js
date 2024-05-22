import mysql from 'mysql';

export default class Query
{
	conn;

	constructor() {
		this.conn = mysql.createConnection({
			host: 'dev-01.icserver.ru',
			user: 'vtp',
			password: '93&do%YoCHUm',
			database : 'vtp_bot',
		});

		this.conn.connect();
	}

	selectAll(table) {
		return new Promise((resolve, reject) => {
			this.conn.query(`SELECT * FROM ${table}`, (err, result) => {
				if (!err) resolve(result);
				else reject(err, result);
			});
		});
	}
}
