import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

    @Input()
    public src: string = "";

    @Output("time")
    public timeChangedEvent: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
        console.log(this.src);
    }

}
