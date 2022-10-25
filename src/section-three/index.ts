import {
    fromEvent,
    of,
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

export const execAutoComplete = () => {
    const container = document.querySelector('#result');
    const textInput = document.createElement('INPUT');
    textInput.setAttribute('type', 'text');
    textInput.setAttribute('id', 'txtInput');
    textInput.style.cssText = `width: 300px`;
    container?.appendChild(textInput);
    fromEvent(textInput, 'keyup')
        .pipe(
            map((e: any) => e.target.value.trim()),
            debounceTime(500),
            // 단어의 수를 체크하여 처리 하고 싶은 경우 filter 를 사용하여 length 체크
            filter((text: string) => text.length > 1),
            // 같은 단어는 처리 안할 시 distinctUntilChanged 사용
            distinctUntilChanged()
            // 비동기 통신 시 switchMap 사용
        )
        .subscribe((word: string) => {
            console.log('word : ', word);
        });
};

type ProcessProducer<T, D> = (q: D) => ObservableInput<T>;

export const customOperatorByMergeProducer = <S, D>(
    processProducer: ProcessProducer<S, D>
): OperatorFunction<D, S> => {
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
        of(`auto complete! ${data}` as any).pipe(delay(2000));

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
    execCustomProducer<string>('Observable').subscribe(({ result }) => {
        console.log('result : ', result);
    });
};
