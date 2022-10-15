export function useState<T = any>(value: T): [Function, Function] {
    // 초기값 할당
    let stateValue: T = value;
    // 함수가 속한 렉시컬 스코프를 기억하여 
    // 함수가 렉시컬 스코프 밖에서 실행될 때에도 
    // 해당 스코프에 접근할 수 있게 해준다.
    // 그러므로 state 함수와 setState 함수는 클로저다.
    function state() {
        return stateValue;
    }
    function setState(newValue: T) {
        stateValue = newValue;
    }

    // 외부에서 접근 할 수 있도록 함수들을 내보낸다.
    return [state, setState];
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
    
}
