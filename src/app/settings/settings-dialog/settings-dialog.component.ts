import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {

    public currentTheme: string;
    public readableColors: boolean;
    public messageTimestamp: boolean;

    public themes: {name: string, id: string}[] = [
        {
            name: "Light",
            id: "light"
        },
        {
            name: "Dark",
            id: "dark"
        }
    ];

    constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>, protected settings: SettingsService){
        this.currentTheme = settings.getTheme();
        this.readableColors = settings.getReadableColors();
        this.messageTimestamp = settings.getMessageTimestamp();
    }

    protected onThemeChange(change: MatRadioChange){
        this.settings.setTheme(change.value);
    }

    protected onReadableColorsChange(change: MatCheckboxChange){
        this.settings.setReadableColors(change.checked);
    }

    protected onMessageTimestampChange(change: MatCheckboxChange){
        this.settings.setMessageTimestamp(change.checked);
    }
}
