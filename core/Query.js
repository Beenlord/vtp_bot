import mysql from 'mysql';

export default class Query
{
    conn;

    static createConnection(opt) {
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

    static query(sql, ...values) {
        return new Promise((resolve, reject) => {
            this.conn.query({
                sql,
                values,
            }, (err, res) => {
                if (!err) resolve(res);
                else reject(err, res);
            });
        });
    }

    static selectAll(table) {
        return this.query(`SELECT * FROM ??`, [table]);
	}

    static selectGroup(table, column) {
        return this.query(`SELECT * FROM ?? GROUP BY ??`, table, column);
    }
}
