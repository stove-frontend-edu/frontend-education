import { TaskCaller } from '../tasks';

export const solutionMicroMacroTask = () => {
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
};
