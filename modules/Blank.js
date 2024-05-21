import fs from 'fs';
import { dirname, join, resolve } from 'path';
import Handlebars from 'handlebars';

export default class Blank
{
    tpl_cash;
    tpl_folder;

    constructor() {
        this.tpl_cash = {
            std: `
<b>test</b>
<ul>
    {{#list}}<li>{{val}}</li>{{/list}}
</ui>
            `,
        };
        this.tpl_folder = join(dirname(process.argv[1]), 'templates');
    }

    write(tpl_name, data = {}) {
        let result_cash = null;

        return new Promise(async (res, rej) => {
            result_cash = this.tpl_cash?.[tpl_name] ?? await this.#getTemplate(tpl_name);

            result_cash = Handlebars.compile(result_cash);
            if (!result_cash) rej();

            result_cash = result_cash(data);
            if (!result_cash) rej();

            res(result_cash);
        });
        // await this.#getTemplate();
        // return null;
    }

    // PRIVATE ZONE

    #getTemplate(file_name) {
        return new Promise((res, rej) => {
            if (!fs.existsSync(this.#tplFilePath(file_name))) rej();
            else res(fs.readFileSync(this.#tplFilePath(file_name)));
        });
    }

    #tplFilePath(file_name) {
        return join(this.tpl_folder, `${file_name}.htm`);
    }
}
