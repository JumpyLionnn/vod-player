import { ViewChild, ElementRef } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VgControlsComponent, VgMuteComponent } from '@videogular/ngx-videogular/controls';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { DialogService } from '../dialog.service';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

    @Input()
    public src: string | null = null;

    @Output("timeupdate")
    public timeChangedEvent: EventEmitter<number> = new EventEmitter();

    @Output("duration")
    public durationEvent: EventEmitter<number> = new EventEmitter();

    @ViewChild("media", { static: true })
    public videoElement!: ElementRef<HTMLVideoElement>;

    @ViewChild(VgControlsComponent)
    public controls!: VgControlsComponent;

    @ViewChild(VgMuteComponent)
    public muteButton!: VgMuteComponent;

    private videoApi!: VgApiService;

    constructor(private dialog: DialogService) {
        document.addEventListener("keydown", (e) => this.onKeyDown(e));
    }

    ngOnInit(): void { }

    onPlayerReady(e: VgApiService) {
        this.videoApi = e;
    }

    public seekTo(time: number){
        if(this.videoApi.isMetadataLoaded){
            this.videoApi.seekTime(time);
            this.videoApi.play();
        }
        else{
            const callback = () => {
                this.videoApi.seekTime(time);
                this.videoApi.play();
                this.videoElement.nativeElement.removeEventListener("loadedmetadata", callback);
            };
            this.videoElement.nativeElement.addEventListener("loadedmetadata", callback)
        }
    }

    protected updateTime(){
        this.timeChangedEvent.emit(this.videoElement.nativeElement.currentTime);
    }

    protected onLoadedMetaData(){
        this.durationEvent.emit(this.videoElement.nativeElement.duration);
    }


    protected onKeyDown(event: KeyboardEvent) {
        const element = <HTMLElement>event.target;
        if(element.tagName === "INPUT"){
            return;
        }
        const slection = getSelection();
        if(slection !== null && !slection.isCollapsed){
            return;
        }
        if(this.dialog.areAnyDialogsOpen()){
            return;
        }
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
            case "KeyM":
                this.toggleMute();
                break;
        }
    }

    private toggleMute(){
        this.muteButton.changeMuteState();
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
