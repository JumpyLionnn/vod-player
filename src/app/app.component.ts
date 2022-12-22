import { Component, ViewChild } from '@angular/core';
import { Broadcast } from './broadcast.model';
import { ChatReplayComponent } from './chat-replay/chat-replay.component';
import { DataLoaderService } from './data-loader.service';
import { VideoPlayerComponent } from './video-player/video-player.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    public broadcastData?: Broadcast;

    @ViewChild("video", { static: true })
    public video!: VideoPlayerComponent;

    @ViewChild("chatReplay", { static: true })
    public chatReplay!: ChatReplayComponent;

    constructor(private loader: DataLoaderService) {
         loader.onLoad.subscribe((data) => {
            this.broadcastData = data;
            this.video.seekTo(data.startTime);
            this.chatReplay.scrollDown();
         });
    }
}
