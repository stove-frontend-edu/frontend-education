import { TaskCaller } from './tasks';

export const excuteMicroMacroTask = () => {
    const macroCallback = () =>
        console.log('1.macro task: called macro task timeout callback.');

    const microCallback = () => {
        console.log(
            '2.micro task: called micro task queueMicrotask callback first.'
        );
        console.log(
            '3.micro task: called micro task queueMicrotask callback second.'
        );
    };

    const microTimeoutCallback = () =>
        setTimeout(() => console.log('4.micro settimeout'), 0);

    const promiseCallback = () => console.log('5.called Promise callback');

    queueMicrotask(microTimeoutCallback);
    setTimeout(macroCallback, 0);
    queueMicrotask(microCallback);
    Promise.resolve().then(() => promiseCallback());
};

// TODO: 콘솔에 onUpdate for First -> second -> third 순으로 출력하세요.
export const questionMicroMacroTask = () => {
    const caller: TaskCaller = new TaskCaller();
    caller.onUpdate = () => {
        console.log('onUpdate for First');
    };
    caller.callTask();
    const secondTask = () => console.log('second');
    const thirdTask = () => console.log('third');
    secondTask();
    thirdTask();
};
