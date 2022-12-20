import { Input } from '@angular/core';
import { Component, ElementRef, HostListener } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
	selector: 'app-picture-in-picture',
	templateUrl: './picture-in-picture.component.html',
	styleUrls: ['./picture-in-picture.component.scss']
})
export class PictureInPictureComponent {

	@Input("video")
	public videoElement!: HTMLVideoElement;

	constructor(public API: VgApiService){
	}

	@HostListener('click')
	public async togglePip(){
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		  } else if (document.pictureInPictureEnabled) {
			this.videoElement.requestPictureInPicture();
		}
	}
}
