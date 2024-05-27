import { parse } from "node-html-parser";
import axios from "axios";
import fs from "fs";
import path from "path";
import murmurhash from "murmurhash";

export default class Parser
{
    addr;

    constructor(addr) {
        this.addr = addr;
    }

    async parse(conf) {
        const cnt = await this.checkCache(this.addr, async (url) => {
            return await axios.get(url, {}, {
                headers: {
                    'User-Agent': 'Mozilla/4.2 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 YaBrowser/24.4.0.0 Safari/537.36'
                },
            });
        });

        return conf(parse(cnt));
    }

    async checkCache(addr, onUpload) {
        const url = new URL(addr);
        const ts = Date.now();
        
        const cache_dir = fs.readdirSync('.cache');
        const cache_file = cache_dir.find((f_name) => {
            return f_name.includes(url.hostname);
        });

        let cache_file_ts = cache_file?.split('+')?.[0];
        if (cache_file_ts) cache_file_ts = +cache_file_ts;

        if (!cache_file) {
            const res = await onUpload(addr);
            const cnt = (res.status === 200) && res.data;
            return this.writeCache(url.hostname, cnt);
        }

        if (cache_file_ts) {
            const m = new Date(ts - cache_file_ts).getMinutes();

            if (m > 45) {
                const res = await onUpload(addr);
                const cnt = (res.status === 200) && res.data;
                fs.unlinkSync(path.join('.cache', cache_file));
                return this.writeCache(url.hostname, cnt);
            }
        }

        return fs.readFileSync(path.join('.cache', cache_file), 'utf8');
    }

    writeCache(host, content) {
        const timestamp = Date.now();
        fs.writeFileSync(path.join('.cache', `${timestamp}+${host}.cache`), content);
        return content;
    }
}