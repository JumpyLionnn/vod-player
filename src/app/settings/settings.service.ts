import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public onReadableColorsChange = new EventEmitter<boolean>();

    constructor() { }

    public setReadableColors(value: boolean){
        localStorage.setItem("settings-readable-colors", JSON.stringify(value));
        this.onReadableColorsChange.emit(value);
    }

    public getReadableColors(): boolean{
        const readableColors = localStorage.getItem("settings-readable-colors");
        if(readableColors === null){
            return true; // default value
        }
        return JSON.parse(readableColors);
    }
}
