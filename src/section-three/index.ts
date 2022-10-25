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
    // TODO: fromEvent를 사용하여 text input 의 keyup 이벤트 처리 후 operator를 사용하여 자동완성 기능을 구현하세요.
    // 조건 :
    // 1. debounceTime 을 적용하여 마지막 이벤트만 처리하도록 합니다.
    // 2. 공백은 제거합니다.
    // 3. 글자가 한글자 이상이여야 합니다.
    // 4. 같은 단어는 처리하지 않습니다.
    // fromEvent 참고: https://rxjs.dev/api/index/function/fromEvent
    // operator 참고: https://www.learnrxjs.io/learn-rxjs/operators
};
