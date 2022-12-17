import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input()
    public message!: Message;

    constructor() { }

    ngOnInit(): void {
    }

}
