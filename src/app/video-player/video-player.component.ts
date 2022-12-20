import { ViewChild, ElementRef } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VgControlsComponent } from '@videogular/ngx-videogular/controls';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

    @Input()
    public src: string = "";

    @Output("timeupdate")
    public timeChangedEvent: EventEmitter<number> = new EventEmitter();

    @ViewChild("media", { static: true })
    public videoElement!: ElementRef<HTMLVideoElement>;

    @ViewChild(VgControlsComponent)
    public controls!: VgControlsComponent;

    private videoApi!: VgApiService;

    constructor() {
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
    }

    ngOnInit(): void { }

    onPlayerReady(e: VgApiService) {
        this.videoApi = e;
    }

    public updateTime(){
        this.timeChangedEvent.emit(this.videoElement.nativeElement.currentTime);
    }


    public onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case "Space":
            case "KeyK":
                this.togglePlay();
                break;
            case "ArrowRight":
                this.seekFroward();
                break;
            case "ArrowLeft":
                this.seekBackwords();
                break;
            case "ArrowUp":
                this.raiseVolume();
                break;
            case "ArrowDown":
                this.lowerVolume();
                break;
            case "KeyF":
                this.toggleFullscreen();
                break;
        }
    }

    private toggleFullscreen() {
        this.videoApi.fsAPI.toggleFullscreen();
    }

    private lowerVolume() {
        this.controls.show();
        this.videoElement.nativeElement.volume = Math.max(this.videoElement.nativeElement.volume - 0.05, 0);
    }

    private raiseVolume() {
        this.controls.show();
        this.videoElement.nativeElement.volume = Math.min(this.videoElement.nativeElement.volume + 0.05, 1);
    }

    private seekBackwords() {
        this.videoElement.nativeElement.currentTime -= 5;
    }

    private seekFroward() {
        this.videoElement.nativeElement.currentTime += 5;
    }

    private togglePlay() {
        if (this.videoElement.nativeElement.paused) {
            this.videoElement.nativeElement.play();
        }
        else {
            this.videoElement.nativeElement.pause();
        }
    }

}
