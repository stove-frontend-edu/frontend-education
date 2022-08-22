import { TaskCaller } from "../tasks";

export const solutionMicroMacroTask = () => {
    const words: Array<string> = [];
    const firstTask = () => words.push('first');
    const secondTask = () => words.push('second');
    const thirdTask = () => Promise.resolve().then(() => words.push('third'));
    const fourthTask = () => setTimeout(() => words.push('fourth'), 0);
    queueMicrotask(() => {
        firstTask();
        secondTask();
    });
    thirdTask();
    fourthTask();
    setTimeout(() => {
        (document.querySelector('#result') as HTMLElement).innerText = words.join(',');
    }, 0);
};

export const solutionMicroMacroTaskSecond = () => {
    const firstTask = new Promise((resolve) => {
        const caller: TaskCaller = new TaskCaller();
        caller.onUpdate = () => {
            console.log('onUpdate for First');
            resolve(true);
        };
        caller.callTask();
    });
    const secondTask = () => console.log('second');
    const thirdTask = () => console.log('third');
    firstTask.then(() => {
        secondTask();
        thirdTask();
    });
}
