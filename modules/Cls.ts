import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js";

export default class Cls {
    public static ok(...args) {
        this.logolize(chalk.bgGreen.white, ...args);
    }

    public static err(...args) {
        this.logolize(chalk.bgRed.white, ...args);
    }

    private static colorize(color, ...props) {
        return props.reduce((acc, v, k) => {
            if (k === 0) acc.push(color(v));
            else acc.push(v);

            return acc;
        }, []);
    }

    private static logolize(color, ...args) {
        console.log(...this.colorize(color, ...args));
    }
}
