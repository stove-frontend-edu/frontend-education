export function useState<T = any>(value: T): [Function, Function] {
    // 초기값 할당
    let stateValue: T = value;
    // TODO: stateValue를 참조하고 변경할 수 있는 함수를 구현해보세요.

    // 외부에서 접근 할 수 있도록 함수들을 내보낸다.
    return [() => '', () => ''];
}

export const execClosure = () => {
    const target = document.getElementById('result');
    const firstlabel = document.createElement('label');
    const secondlabel = document.createElement('label');
    target?.appendChild(firstlabel);
    target?.appendChild(secondlabel);
    const [names, setName] = useState<string>('kenneth');
    firstlabel.innerText = names();
    setName('my name is Kenneth');
    secondlabel.innerText = names();
};
