type TFunction = (value: any) => void;

export interface IEmitter {
	on(event: string, fn: TFunction): void;
	off(event: string, fn: TFunction): void;
	emit(event: string, value?: any): void;
}

export class Emitter {
	private events: any;

	constructor() {
		this.events = {};
	}

	public on(event: string, fn: TFunction) {
		if (!this.events?.[event]) {
			this.events[event] = [];
		}
		this.events[event].push(fn);
	}

	public off(event: string, fn: TFunction) {
		if (this.events[event]) {
			this.events[event] = this.events[event].filter((_fn: TFunction) => {
				return _fn !== fn;
			});
		}
	}

	public emit(event: string, value?: any) {
		if (this.events?.[event]) {
			this.events[event].forEach((fn: TFunction) => fn(value));
		}
	}
}
