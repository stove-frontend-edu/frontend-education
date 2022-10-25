import { fromEvent, Subject, of, fromEventPattern } from 'rxjs';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
} from 'rxjs/operators';

export const execAutoComplete = () => {
    const container = document.querySelector('#result');
    const textInput = document.createElement('INPUT');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'txtInput');
    textInput.style.cssText = `width: 300px`;
    container?.appendChild(textInput);
    // TODO: fromEvent를 사용하여 text input 의 keyup 이벤트 처리 후
    // debounceTime, operator를 사용하여 자동완성 기능을 구현하세요.
    // fromEvent 참고: https://rxjs.dev/api/index/function/fromEvent
};
