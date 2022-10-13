export class EventDispatcher {
	static INSTANCE: EventDispatcher;

	constructor() {}
 
 	static getInstance() {
        if (!EventDispatcher.INSTANCE) {
            EventDispatcher.INSTANCE = new EventDispatcher();
        }
        return EventDispatcher.INSTANCE;
    }
  
    addEventLitener(eventName: string, listener: any, options?: any) {
        addEventListener(eventName, listener, options)
    }
  
    removeEventListener(eventName: string, listener: any) {
        removeEventListener(eventName, listener);
    }
  
    dispatchEvent<T = any>(eventName: string, data: T) {
        dispatchEvent(
            new CustomEvent(eventName, {
                detail: {
                ...data
            }
        }));
    }
}

const eventDispatcher: EventDispatcher = EventDispatcher.getInstance();

export {eventDispatcher as EventManager}; 
