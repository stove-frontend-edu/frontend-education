export class TaskCaller {
    public onUpdate: any;
    constructor() {}

    public callTask() {
        new Promise((resolve) =>
            setTimeout(() => {
                if (this.onUpdate) {
                    this.onUpdate();
                }
                resolve(true);
            }, Math.round(Math.random() * 15) * 1000)
        );
    }
}

export const loadingTask = () => {};
