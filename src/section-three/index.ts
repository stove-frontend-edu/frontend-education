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
    fromEvent(textInput, 'keyup')
        .pipe(
            map((e: any) => e.target.value),
            debounceTime(500)
            // 단어의 수를 체크하여 처리 하고 싶은 경우 filter 를 사용하여 length 체크
            // 같은 단어는 처리 안할 시 distinctUntilChanged 사용
            // 비동기 통신 시 switchMap 사용
        )
        .subscribe((word: string) => {
            console.log('word : ', word);
        });
};
