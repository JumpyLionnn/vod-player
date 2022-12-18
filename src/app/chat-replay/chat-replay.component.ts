import { Component, Input, OnInit } from '@angular/core';
import { Data, Message } from "./messages.model";

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

    constructor() { }

    ngOnInit(): void {
    }
}
