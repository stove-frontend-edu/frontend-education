export class DocumentSelectionExample {
    private message: string;

    constructor(
        configuration = {}
    ) {
        this.message = 'Nice to meet you seed!';
        this.init();
    }

    init() {
        this.selection(this.message);
    }

    selection(data: string) {
        (document.querySelector('#result') as HTMLElement).innerText = data;
    }
}