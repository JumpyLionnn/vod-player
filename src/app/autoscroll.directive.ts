import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appAutoscroll]',
    exportAs: "appAutoscroll"
})
export class AutoscrollDirective {
    public isAboveTreshold: boolean = false;

    @Input()
    public scrollTreshold: number = 300;

    @Output("scroll-reached")
    public onScollTresholdReached = new EventEmitter<boolean>()

    private lastHeight: number;

    constructor(private element: ElementRef<HTMLDivElement>) {
        this.lastHeight = element.nativeElement.scrollHeight;
    }

    @HostListener("scroll")
    public onScroll() {
        const margin = this.element.nativeElement.scrollHeight - this.element.nativeElement.clientHeight -  this.element.nativeElement.scrollTop;
        const oldValue = this.isAboveTreshold;
        if(margin >= this.scrollTreshold){
            this.isAboveTreshold = true;
        }
        else{
            this.isAboveTreshold = false;
        }

        if(oldValue != this.isAboveTreshold){
            this.onScollTresholdReached.emit(this.isAboveTreshold);
        }
    }

    public ngDoCheck(){
        if(this.lastHeight != this.element.nativeElement.scrollHeight){
            this.lastHeight = this.element.nativeElement.scrollHeight;
            if(!this.isAboveTreshold)
                this.element.nativeElement.scrollTop = this.lastHeight;
        }
    }

    public scrollDown(){
        this.isAboveTreshold = false;
        this.element.nativeElement.scrollTo({
            top: this.element.nativeElement.scrollHeight,
            behavior: "smooth"
        });
    }

}
