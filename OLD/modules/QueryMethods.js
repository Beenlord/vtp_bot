

export default class QueryMethods
{
    createLog(name = 'empty', decription = '', user = '') {
		this.conn.query(`INSERT INTO logs (action, description, user, date) VALUES (?, ?, ?, ?)`, [name, decription, user, new Date()]);
	}

    getLogs(max = 3) {
        return new Promise((resolve, reject) => {
            this.conn.query(`
                SELECT
                    action,
                    decription,
                    user,
                    date
                FROM
                    logs
                ORDER BY DESC
            `);
        });
    }
}