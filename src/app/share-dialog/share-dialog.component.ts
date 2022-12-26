import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild } from '@angular/core';
import { TimeInputComponent } from '../time-input/time-input.component';
import { AfterViewInit } from '@angular/core';

export interface ShareDialogData{
    duration: number;
    currentTime: number;
    videoUrl: string;
    dataUrl: string;
    title: string | null;
    username: string | null;
}

@Component({
    selector: 'app-share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements AfterViewInit {
    constructor(public dialogRef: MatDialogRef<ShareDialogComponent>, private clipboard: Clipboard, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: ShareDialogData, private changeDetector: ChangeDetectorRef) { }

    public url: string = "";
    
    public shareDescription: string = "Check out vo"

    public time: number = 0;
    public timeEnabled: boolean = false;

    @ViewChild("timeInput", { static: true })
    private timeInput!: TimeInputComponent;

    public platforms: string[] = ["facebook", "twitter", "reddit", "telegram", "whatsapp", "pinterest", "linkedin"];

    ngAfterViewInit(){
        this.timeInput.set(this.data.currentTime);
        this.updateUrl();
        this.changeDetector.detectChanges();
    }

    public onCopy() {
        this.clipboard.copy(this.url);
        this.snackBar.open("Link copied to clipboard", undefined, {
            horizontalPosition: "left",
            verticalPosition: "bottom",
            duration: 4 * 1000
        });
    }

    protected onTimeChange(value: number) {
        this.time = value;
        this.updateUrl();
    }

    protected updateUrl(){
        this.url = window.location.host + window.location.pathname;
        this.url += `?mp4=${this.data.videoUrl}&json=${this.data.dataUrl}`;
        if(this.timeEnabled && this.time !== 0){
            this.url += `&t=${this.time}`;
        }

        this.shareDescription = `${this.data.title ?? "Twitch VOD"}`;
        if(this.data.username !== null){
            this.shareDescription += `by ${this.data.username}`;
        }
        this.shareDescription += ".";
    }
}
