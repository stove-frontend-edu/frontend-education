export class FluxAction {
    actionStore: {[key: string]: any};

    constructor() {
        this.actionStore = {};
    }

    addAction(action: string, func: any): void {
        if (this.actionStore[action] == null) {
            this.actionStore[action] = [];
        }
        const funcList: Array<any> = this.actionStore[action] as Array<any>;
        if (!funcList.some(x => x === func)) {
            funcList.push(func);
        }
    }

    removeActionFunction(action: string, func: any): void {
        if (this.actionStore[action] === null) return;
        const funcList: Array<any> = this.actionStore[action] as Array<any>;
        for (let i = 0; i < funcList.length; i++) {
            if (funcList[i] === func) {
                funcList.splice(i, 1);
                return;
            }
        }
    }

    removeAction(action: string): void {
        if (this.actionStore[action] === null) return;
        const funcList: Array<any> = this.actionStore[action] as Array<any>;
        funcList.length = 0;
        this.actionStore[action] = null;
    }

    executeAction(action: string, data: any): void {
        if (this.actionStore[action] === null) return;
        const funcList: Array<any> = this.actionStore[action] as Array<any>;
        for (let i = 0; i < funcList.length; i++) {
            funcList[i](data);
        }
    }

    clear(): void {
        for (const action in this.actionStore) {
            if (this.actionStore.hasOwnProperty(action)) {
                this.removeAction(action);
            }
        }
    }
}