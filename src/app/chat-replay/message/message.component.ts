import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Message } from '../../broadcast.model';

enum FragmentType{
    Text,
    Emote
    // TODO: add link parsing
}

interface TextFragment{
    type: FragmentType.Text;
    text: string;
}

interface EmoteFragment{
    type: FragmentType.Emote;
    id: string;
    set_id: string | null;
    name: string;
}

type Fragment = TextFragment | EmoteFragment;

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

    @Input()
    public message!: Message;

    public contentFragments: Fragment[] = [];

    public FragmentTypeEnum = FragmentType;

    constructor() {}

    ngOnInit(): void {
        this.parse();
    }

    ngOnChanges(){
        this.parse();
    }


    private parse(){
        this.contentFragments = [];
        for(const frament of this.message.message.fragments){
            if(frament.emoticon !== null){
                this.contentFragments.push({
                    type: FragmentType.Emote,
                    id: frament.emoticon?.emoticon_id,
                    set_id: frament.emoticon?.emoticon_set_id,
                    name: frament.text
                });
            }
            else{
                this.contentFragments.push({
                    type: FragmentType.Text,
                    text: frament.text
                });
            }
        }
    }

}
