import { EventEmitter, Injectable } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';

interface Emote{
    code: string;
    imageType: string;
}

interface BetterTTVEmote extends Emote{
    id: string;
    userId: string;
}

interface BetterTTVSharedEmote extends Emote{
    id: string;
    user: {id: string, name: string, displayName: string, providerId: string };
}


interface FFZChannelEmote extends Emote{
    id: number;
    user: {id: number, name: string, displayName: string };
    images: {[size: string]: string}
}

@Injectable({
    providedIn: 'root'
})
export class BetterttvEmoteService {

    private globalEmotes: Map<string, BetterTTVEmote> = new Map();
    private ffzChannelEmotes: Map<string, FFZChannelEmote> = new Map();
    private channelSharedEmotes: Map<string, BetterTTVEmote> = new Map();
    private channelEmotes: Map<string, BetterTTVEmote> = new Map();

    public onLoad: EventEmitter<void> = new EventEmitter();

    constructor(private loader: DataLoaderService) {
        if (loader.isLoaded) {
            this.loadEmotes();
        }
        else {
            loader.onLoad.subscribe((data) => this.loadEmotes());
        }

    }

    public lookupEmote(code: string) {
        if(this.channelEmotes.has(code)) {
            const emote = this.channelEmotes.get(code)!;
            return {
                url: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
                code: emote.code
            };
        }
        if(this.channelSharedEmotes.has(code)) {
            const emote = this.channelSharedEmotes.get(code)!;
            return {
                url: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
                code: emote.code
            };
        }
        if(this.ffzChannelEmotes.has(code)) {
            const emote = this.ffzChannelEmotes.get(code)!;
            return {
                url: emote.images["1x"],
                code: emote.code
            };
        }
        if(this.globalEmotes.has(code)) {
            const emote = this.globalEmotes.get(code)!;
            return {
                url: `https://cdn.betterttv.net/emote/${emote.id}/1x`,
                code: emote.code
            };
        }
        return null;
    }

    private loadEmotes() {
        const channelEmotesPromise = fetch(`https://api.betterttv.net/3/cached/users/twitch/${this.loader.broadcastData.userId}`)
            .then((response: Response) => response.json())
            .then((data: { channelEmotes: BetterTTVEmote[], sharedEmotes: BetterTTVEmote[] }) => {
                for (let i = 0; i < data.sharedEmotes.length; i++) {
                    const emote = data.sharedEmotes[i];
                    this.channelSharedEmotes.set(emote.code, emote);
                }
                for (let i = 0; i < data.channelEmotes.length; i++) {
                    const emote = data.channelEmotes[i];
                    this.channelEmotes.set(emote.code, emote);
                }
            });
        
        const ffzChannelEmotesPromise = fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${this.loader.broadcastData.userId}`)
            .then((response: Response) => response.json())
            .then((emotes: FFZChannelEmote[]) => {
                for (let i = 0; i < emotes.length; i++) {
                    const emote = emotes[i];
                    this.ffzChannelEmotes.set(emote.code, emote);
                }
            });

        const globalEmotesPromise = fetch("https://api.betterttv.net/3/cached/emotes/global")
            .then((response: Response) => response.json())
            .then((emotes: BetterTTVEmote[]) => {
                for (let i = 0; i < emotes.length; i++) {
                    const emote = emotes[i];
                    this.globalEmotes.set(emote.code, emote);
                }
            });

        Promise.all([channelEmotesPromise, ffzChannelEmotesPromise, globalEmotesPromise])
            .then(() => {
                this.onLoad.emit();
            });
    }
}
