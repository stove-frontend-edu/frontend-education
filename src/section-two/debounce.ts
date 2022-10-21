export const debounce = (callback: Function, delayTime = 0) => {
    let timeout: any = null;
    return (...args: any[]) => {
        // 실행되지 않은 settimeout은 clear
        if (timeout) clearTimeout(timeout);

        // settimeout clear를 위해 저장.
        timeout = setTimeout(() => {
            // 지정된 함수 실행
            callback(...args);
            // 함수 실행 후 settimeout clear
            clearTimeout(timeout);
        }, delayTime);
    };
};

export const drawTemplateByDebounce = () => {
    const textDebounce = debounce((text: string) => {
        alert(text);
    }, 500);
    const container = document.querySelector('#result');
    const textInput: HTMLInputElement = document.createElement('input');
    textInput.setAttribute('type', 'text');
    textInput.style.cssText = 'width: 200px;';
    textInput.addEventListener('keyup', (event: any) => {
        textDebounce(event.target.value);
    });
    container?.appendChild(textInput);
};
