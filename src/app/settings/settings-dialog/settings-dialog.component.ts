import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {

    public readableColors: boolean;
    public messageTimestamp: boolean;

    constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, protected settings: SettingsService){
        this.readableColors = settings.getReadableColors();
        this.messageTimestamp = settings.getMessageTimestamp();
    }


    protected onReadableColorsChange(change: MatCheckboxChange){
        this.settings.setReadableColors(change.checked);
    }

    protected onMessageTimestampChange(change: MatCheckboxChange){
        this.settings.setMessageTimestamp(change.checked);
    }
}
