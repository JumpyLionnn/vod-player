import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Message } from '../../broadcast.model';
import { SettingsService } from '../../settings/settings.service';
import Color from "color";
import { BetterttvEmoteService } from '../betterttv-emote.service';

enum FragmentType{
    Text,
    Emote,
    Link,
    BetterTTVEmote
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

interface BetterTTVEmoteFragment{
    type: FragmentType.BetterTTVEmote;
    url: string;
    name: string;
}

type Fragment = TextFragment | EmoteFragment | LinkFragment | BetterTTVEmoteFragment;

const urlRegex = /(?<=\s|^)((https?:)?\/\/)?(www\.)?[-a-zA-Z0-9:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(?=\s|$)/g;
const whitespaceRegex = /(\s+)/;

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

    protected FragmentTypeEnum = FragmentType;

    protected showTimestamp: boolean = false;
    protected timestamp: string = "";

    constructor(private settings: SettingsService, private betterTTVEmote: BetterttvEmoteService) {
        this.settings.onThemeChange.subscribe(this.changeReadableColors.bind(this));
        this.settings.onReadableColorsChange.subscribe(this.changeReadableColors.bind(this));
        this.settings.onMessageTimestampChange.subscribe(this.onMessageTimestampChange.bind(this));
        this.betterTTVEmote.onLoad.subscribe(this.parse.bind(this));
    }

    ngOnInit(): void{
        this.changeReadableColors(this.settings.getReadableColors());
        this.onMessageTimestampChange(this.settings.getMessageTimestamp());
    }

    ngOnChanges(){
        this.parse();
    }

    private onMessageTimestampChange(value: boolean){
        this.showTimestamp = value;
        if(value){
            const totalSeconds = this.message.content_offset_seconds;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
            const seconds = totalSeconds - (hours * 3600) - (minutes * 60);

            let timestamp = "";
            if(hours > 0){
                timestamp += hours.toString() + ":";
            }
            timestamp += minutes.toString().padStart(2, "0") + ":";
            timestamp += seconds.toString().padStart(2, "0");
            
            this.timestamp = timestamp;
        }
    }

    private changeReadableColors(value: boolean){
        if(value){
            const backgroundColor = getBackgroundColor();
            const fontColor = new Color(this.message.message.user_color);

            const contrastRatio = backgroundColor.contrast(fontColor);
            const minContrastRatio = 4.5;
            if(contrastRatio < minContrastRatio){
                const backgroundLight = backgroundColor.lightness();
                const contrastDiff = minContrastRatio - contrastRatio;
                
                const change = contrastDiff * 7;

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
                        this.contentFragments.push(...this.parseEmotes(fragment.text.slice(lastIndex, match.index)));
                    }
                    lastIndex = index + length;
                    this.contentFragments.push({
                        type: FragmentType.Link,
                        url: fragment.text.slice(match.index, lastIndex)
                    });
                }
                if(lastIndex < fragment.text.length){
                    this.contentFragments.push(...this.parseEmotes(fragment.text.slice(lastIndex)));
                }
            }
        }
    }

    private parseEmotes(str: string){
        const tokens = str.split(whitespaceRegex);
        const fragments: Fragment[] = [];
        let lastIndex = 0;
        let currentIndex = 0;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const emote = this.betterTTVEmote.lookupEmote(token);
            if(emote !== null){
                console.log(str);
                console.log("better ttv emote rendered", token, str.slice(lastIndex, currentIndex));
                fragments.push({
                    type: FragmentType.Text,
                    text: str.slice(lastIndex, currentIndex)
                });
                
                fragments.push({
                    type: FragmentType.BetterTTVEmote,
                    url: emote.url,
                    name: emote.code
                });

                currentIndex += token.length;
                lastIndex = currentIndex;
            }
            else{
                currentIndex += token.length;
            }

        }
        if(lastIndex < str.length){
            fragments.push({
                type: FragmentType.Text,
                text: str.slice(lastIndex)
            });
        }
        return fragments;
    }
}

// this is a hack, but this is the best way and it works
let bodyStyle = getComputedStyle(document.body);
function getBackgroundColor(){
    return new Color(bodyStyle.backgroundColor);
}
