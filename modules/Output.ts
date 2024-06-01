import chalk from 'https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js';

export default class Output {
	public static log(...props: any) {
		console.log(chalk.white(...props));
	}

	public static done(...props: any) {
		console.log(chalk.bgGreen.white(...props));
	}

	public static error(...props: any) {
		console.log(chalk.bgRed.white(...props));
	}

	public static warn(...props: any) {
		console.log(chalk.bgBlue.white(...props));
	}

	public static info(...props: any) {
		console.log(chalk.bgYellow.black(...props));
	}
}
