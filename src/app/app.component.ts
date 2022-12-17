import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from './chat-replay/messages.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    public videoSource: string = "";
    public messageData?: Data;

    constructor(private route: ActivatedRoute) {
         //TODO: handle null
        route.queryParams.subscribe((params) => {
            if(params["mp4"]){
                this.videoSource = params["mp4"];
            }
            if(params["json"]){
                fetch(params["json"])
                    .then((response) => response.json())
                    .then((data: any) => {
                        this.messageData = {
                            messages: data.comments,
                            user_id: 0,
                            username: ""
                        };

                        if(data["streamer"]){
                            // new format
                            this.messageData.user_id = data["streamer"].id;
                            this.messageData.username = data["streamer"].name;
                        }
                        else if(data["video"]){
                            // old format
                            this.messageData.user_id = data["video"].user_id;
                            this.messageData.username = data["video"].user_name;
                        }
                    });
            }
        });
    }
}
