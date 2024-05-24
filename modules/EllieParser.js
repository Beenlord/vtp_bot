import Parser from "./Parser.js";

export default class EllieParser extends Parser
{
    constructor(addr) {
        super(addr);
    }

    async getData() {
        return await this.parse((root) => {
            const posts = root.querySelectorAll('a[href][label][data-vars-cta]');

            return posts.reduce((acc, post) => {
                const src = post.querySelector('img[src]')?.attributes?.src ?? null;
                const title = post.querySelector('h2 span:not([aria-hidden])')?.innerHTML ?? null;
                const short = post.querySelector('p')?.innerHTML ?? null;
                const date = post.querySelector('span section[data-lazy-parent] + div')?.innerHTML ?? null;
                
                acc.push({
                    src,
                    title,
                    short,
                    date,
                });
    
                return acc;
            }, []);
        });
    }
}