import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Message } from '../../broadcast.model';
import { SettingsService } from '../../settings/settings.service';
import Color from "color";

enum FragmentType{
    Text,
    Emote,
    Link
}

interface TextFragment{
    type: FragmentType.Text;
    text: string;
}

interface LinkFragment{
    type: FragmentType.Link;
    url: string;
}

interface EmoteFragment{
    type: FragmentType.Emote;
    id: string;
    set_id: string | null;
    name: string;
}

type Fragment = TextFragment | EmoteFragment | LinkFragment;

const urlRegex = /(?<=\s|^)((https?:)?\/\/)?(www\.)?[-a-zA-Z0-9:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(?=\s|$)/g;

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges {

    @Input()
    public message!: Message;

    public color: Color = new Color([0, 0, 0], "rgb");
    public contentFragments: Fragment[] = [];

    public FragmentTypeEnum = FragmentType;

    constructor(private settings: SettingsService) {
        this.settings.onReadableColorsChange.subscribe(this.changeReadableColors.bind(this));
    }

    ngOnInit(): void{
        this.changeReadableColors(this.settings.getReadableColors());
    }

    ngOnChanges(){
        this.parse();
    }

    private changeReadableColors(value: boolean){
        if(value){
            const backgroundColor = new Color("black"); // make it dynamic with themes
            const fontColor = new Color(this.message.message.user_color);

            const contrastRatio = backgroundColor.contrast(fontColor);
            const minContrastRatio = 4.5;
            if(contrastRatio < minContrastRatio){
                const backgroundLight = backgroundColor.lightness();
                const contrastDiff = minContrastRatio - contrastRatio;
                
                const change = contrastDiff * 5;

                if(backgroundLight > 50){
                    this.color = fontColor.lightness(fontColor.lightness() - change);
                }
                else{
                    this.color = fontColor.lightness(fontColor.lightness() + change);
                }
            }
            else{
                this.color = fontColor;
            }
        }
        else{
            this.color = new Color(this.message.message.user_color);
        }
    }

    private parse(){
        this.contentFragments = [];
        for(const fragment of this.message.message.fragments){
            if(fragment.emoticon !== null){
                this.contentFragments.push({
                    type: FragmentType.Emote,
                    id: fragment.emoticon?.emoticon_id,
                    set_id: fragment.emoticon?.emoticon_set_id,
                    name: fragment.text
                });
            }
            else{
                const matches = fragment.text.matchAll(urlRegex);
                let lastIndex = 0;
                for(const match of matches){
                    const length = match[0].length;
                    const index = match.index ?? 0;
                    if(index !== lastIndex){
                        this.contentFragments.push({
                            type: FragmentType.Text,
                            text: fragment.text.slice(lastIndex, match.index)
                        });
                    }
                    lastIndex = index + length;
                    this.contentFragments.push({
                        type: FragmentType.Link,
                        url: fragment.text.slice(match.index, lastIndex)
                    });
                }
                if(lastIndex < fragment.text.length){
                    this.contentFragments.push({
                        type: FragmentType.Text,
                        text: fragment.text.slice(lastIndex)
                    });
                }
                
            }
        }
    }
}
