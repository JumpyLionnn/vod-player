import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { Data } from "./messages.model";

@Component({
    selector: 'app-chat-replay',
    templateUrl: './chat-replay.component.html',
    styleUrls: ['./chat-replay.component.scss']
})
export class ChatReplayComponent implements OnInit {

    @Input()
    public data?: Data;

    public currentTime: number = 0;

    public showScrollDownButton: boolean = false;
    private lastHeight: number = 0;

    @ViewChild(NgScrollbar) 
    public scrollbarRef!: NgScrollbar;

    @ViewChild("messagescontainer")
    public messagesContainer!: ElementRef<HTMLDivElement>;


    public scrollTreshold: number = 200;


    constructor() { }

    ngOnInit(): void {
    }

    public ngAfterViewInit() {
        this.scrollbarRef.scrolled.subscribe((e) => this.onScroll(e));
        console.log(this.scrollbarRef.nativeElement);
    }

    public updateVideoTime(time: number){
        this.currentTime = time;
        if(this.lastHeight != this.messagesContainer.nativeElement.scrollHeight){
            this.lastHeight = this.messagesContainer.nativeElement.scrollHeight;
            if(!this.showScrollDownButton){
                this.scrollbarRef.scrollTo({duration: 0, bottom: 0});
            }
        }
    }

    public scrollDown(){
        this.scrollbarRef.scrollTo({bottom: 0});
    }

    private onScroll(event: Event){
        const element = (<HTMLElement>event.target);
        const margin = element.scrollHeight - element.clientHeight - element.scrollTop;
        if(margin >= this.scrollTreshold){
            this.showScrollDownButton = true;
        }
        else{
            this.showScrollDownButton = false;
        }
    }

    onBottomReached(event: Event){
        console.log("bottom reached");
        console.log(event);
    }
}
