import { Emitter, IEmitter, type TFunction } from '@module/Emitter.ts';

const emitter = new Emitter();

const EventBus: IEmitter = class {
	static on(event: string, fn: TFunction) {
		emitter.on(event, fn);
	}

	static off(event: string, fn: TFunction) {
		emitter.off(event, fn);
	}

	static emit(event: string, value?: any) {
		emitter.emit(event, value);
	}
};

export default EventBus;
