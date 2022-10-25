import './main-style.css';

import { EventManager } from './section-one/event-dispatch';
import {
    inlineCashingTest,
    inlineCashingTestByDeOptimize,
} from './section-one/inline-cashing';
import {
    excuteMicroMacroTask,
    questionMicroMacroTask,
} from './section-one/micro-macro-task';
import { solutionMicroMacroTask } from './section-one/solution';
import { mutationObserver } from './section-one/observer-api';
import { execIntersection } from './section-one/intersection-api';
import { execClosure } from './section-two/state';
import {
    execAutoComplete,
    execDoubleClick,
    executeOperator,
} from './section-three';
import {
    concatMapExample,
    mergeMapExample,
    mergeMapToArrayExample,
    mergeAllExample,
    zipExample,
    zipExampleByMergeData,
} from './section-three/http-examples';

const eventExample = () => {
    const test1 = ({ detail: data }: CustomEvent) => {
        console.log('test1 : ', data);
    };
    EventManager.addEventLitener('event-test-1', test1);
    const test2 = ({ detail: data }: CustomEvent) => {
        console.log('test2 : ', data);
    };
    EventManager.addEventLitener('event-test-2', test2);
    // eventManager.removeEventListener('event-test-1', test1);

    EventManager.dispatchEvent('event-test-1', { data: '2' });
    EventManager.dispatchEvent('event-test-2', { data: '3' });
};

const inlineTest = () => {
    inlineCashingTest();
    inlineCashingTestByDeOptimize();
};
