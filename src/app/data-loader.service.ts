import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Broadcast } from './broadcast.model';

@Injectable({
    providedIn: 'root'
})
export class DataLoaderService {
    public broadcastData: Broadcast;

    public onLoad: EventEmitter<Broadcast> = new EventEmitter();

    public isLoaded: boolean = false;

    constructor(private route: ActivatedRoute) {
        //TODO: handle null
        this.broadcastData = {
            title: "Untitled stream.",
            videoUrl: "",
            messages: [],
            userId: 0,
            username: ""
        };
        route.queryParams.subscribe((params) => {
            if (params["mp4"]) {
                this.broadcastData.videoUrl = params["mp4"];
            }
            if (params["json"]) {
                fetch(params["json"])
                    .then((response) => response.json())
                    .then((data: any) => {
                        
                        this.broadcastData.messages = data.comments;
                        if (data["streamer"]) {
                            // new format
                            this.broadcastData.userId = data["streamer"].id;
                            this.broadcastData.username = data["streamer"].name;
                        }
                        else if (data["video"]) {
                            // old format
                            this.broadcastData.title = data["video"].title;
                            this.broadcastData.userId = data["video"].user_id;
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
        });
    }
}
