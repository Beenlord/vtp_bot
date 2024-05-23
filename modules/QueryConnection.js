import mysql from 'mysql';

export default class QueryConnection
{
    conn;

    constructor(opt) {
        opt = {
            host: 'localhost',
            user: 'admin',
            password: 'root',
            database: null,
            ...opt,
        };

        this.conn = mysql.createConnection(opt);
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