/*
MutationRecords = {
    addedNodes: [], // 추가된 자식 노드,
    attributeName: null, // 변경된 속성명
    attributeNamespace: null, // 변경된 속성네임스페이스
    nextSibling: null, // 다음 형제 태그
    previousSibling: null, // 이전 형제 태그
    oldValue: null, // 변경전 값 
    removedNodes: [], // 제거된 자식 노드 
    target: Element, // 대상 태그 
    type: 'attributes' || 'childList' || 'characterData' // 어떤 종류가 변경되었는지
}
*/
export const mutationObserver = () => {
    const makeTemplete = () => {
        const el: HTMLElement = document.getElementById('result') as HTMLElement;
        el.innerHTML = `
            <input id="dupBtn" type="button" value="Add Element" />
            <input id="upBtn" type="button" value="Container Attribute Update" />
            <div id="item-area">
            <div></div>
        `;
    };

    const addEvent = () => {
        const target: HTMLElement = document.getElementById('item-area') as HTMLElement;
        const dupBtn: HTMLElement = document.getElementById('dupBtn') as HTMLElement;
        const upBtn: HTMLElement = document.getElementById('upBtn') as HTMLElement;
        let updateFlag = 0;
        function duplicate() {
            target.appendChild(document.createElement('div'));
        }
        function updateAttr() {
            updateFlag++;
            target.style.backgroundColor = updateFlag % 2 === 0 ? '#fff': '#ccc'
        }
        // observer instance create
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log(mutation.type, mutation);
            });
        });
        // 감지할 항목
        const config = {
            attributes: true,
            childList: true,
            characterData: true
        };
        // 등록
        observer.observe(target, config);
        dupBtn.addEventListener('click', duplicate);
        upBtn.addEventListener('click', updateAttr);
    }

    makeTemplete();
    addEvent();
}