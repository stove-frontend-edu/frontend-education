export class TaskCaller {
    public onUpdate: any;
    constructor() {}

    public callTask() {
        new Promise((resolve) => setTimeout(() => {
            if (this.onUpdate) {
                this.onUpdate();
            }
            resolve(true);
        }, 2000));
    }
}

export const loadingTask = () => {

}