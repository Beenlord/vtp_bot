import QueryConnection from './QueryConnection.js';

export default class Query extends QueryConnection
{
	constructor(opt) {
		super(opt);
	}

	createLog(name = 'empty', decription = '', user = '') {
		this.conn.query(`INSERT INTO logs (action, description, user, date) VALUES (?, ?, ?, ?)`, [name, decription, user, new Date()]);
	}

	getLogs(limit = 3) {
        return new Promise((resolve, reject) => {
            this.conn.query(`
                SELECT
                    action,
                    description,
                    user,
                    date
                FROM
                    logs
                ORDER BY id DESC
				LIMIT ?
            `, [limit], (err, result) => {
				err ? reject(err) : resolve(result);
			});
        });
    }
}
