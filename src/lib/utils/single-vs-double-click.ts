import {Observable, Subject} from "rxjs";

export class SingleVsDblClick {

    private readonly singleClickSubject = new Subject<void>();
    private readonly doubleClickSubject = new Subject<void>();

    readonly singleClick$: Observable<void> = this.singleClickSubject.asObservable();
    readonly doubleClick$: Observable<void> = this.doubleClickSubject.asObservable();

    private clickTimer?: ReturnType<typeof setTimeout>;

    constructor(private readonly timeoutMs = 250) {}

    click() {
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = undefined;

            this.doubleClickSubject.next();
        } else {
            this.clickTimer = setTimeout(() => {
                this.clickTimer = undefined;
                this.singleClickSubject.next();
            }, this.timeoutMs);
        }
    }

    destroy() {
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = undefined;
        }
    }
}