import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Broadcast } from './broadcast.model';

@Injectable({
    providedIn: 'root'
})
export class DataLoaderService {
    public broadcastData: Broadcast;
    public dataUrl: string = "";

    public onLoad: EventEmitter<Broadcast> = new EventEmitter();

    public isLoaded: boolean = false;

    constructor() {
        this.broadcastData = {
            title: null,
            videoUrl: null,
            startTime: 0,
            messages: null,
            userId: null,
            username: null
        };
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (params["mp4"]) {
            this.broadcastData.videoUrl = params["mp4"];
        }
        if (params["t"]) {
            this.broadcastData.startTime = parseInt(params["t"]);
        }
        if (params["json"]) {
            this.dataUrl = params["json"];
            fetch(params["json"])
                .then((response) => response.json())
                .then((data: any) => {
                    
                    this.broadcastData.messages = data.comments;
                    if (data["streamer"]) {
                        // new format
                        this.broadcastData.userId = data["streamer"].id;
                        this.broadcastData.username = data["streamer"].name;
                    }
                    if (data["video"]) {
                        
                        this.broadcastData.title = data["video"].title;

                        // old format
                        if(data["video"].user_id)
                            this.broadcastData.userId = data["video"].user_id;
                        if(data["video"].user_name)
                            this.broadcastData.username = data["video"].user_name;
                    }

                    if(data["title"]){ // custom data
                        this.broadcastData.title = data["title"];
                    }
                    // TODO: maybe add profile picture to the header, if possible

                    this.onLoad.emit(this.broadcastData);
                    this.isLoaded = true;
                });
        }
        else{
            this.onLoad.emit(this.broadcastData);
            this.isLoaded = true;
        }
    }
}
