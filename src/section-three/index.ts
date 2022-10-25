import {
    fromEvent,
    Subject,
    of,
    fromEventPattern,
    ObservableInput,
    OperatorFunction,
    pipe,
    Observable,
} from 'rxjs';
import {
    map,
    filter,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    delay,
} from 'rxjs/operators';

type ProcessProducer<T> = (q: any) => ObservableInput<T>;

export const execAutoComplete = () => {
    const container = document.querySelector('#result');
    const textInput = document.createElement('INPUT');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'txtInput');
    textInput.style.cssText = `width: 300px`;
    container?.appendChild(textInput);
    // TODO: fromEvent를 사용하여 text input 의 keyup 이벤트 처리 후
    // debounceTime, operator를 사용하여 자동완성 기능을 구현하세요.
};

export const customOperatorByMergeProducer = <S>(
    processProducer: ProcessProducer<S>
): OperatorFunction<any, S> => {
    return pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(processProducer)
    );
};

export const execCustomProducer = <T = any>(
    value: T
): Observable<{ result: T }> => {
    const source$ = of(value);
    const customProducer = (data: T) =>
        of(`merge data ${data}` as any).pipe(delay(2000));

    return source$.pipe(
        customOperatorByMergeProducer(customProducer),
        map((result: T) => {
            return {
                result,
            };
        })
    );
};

export const executeOperator = () => {
    execCustomProducer<string>('Observable').subscribe((result: any) => {
        console.log('result : ', result);
    });
};
