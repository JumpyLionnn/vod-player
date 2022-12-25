import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public onReadableColorsChange = new EventEmitter<boolean>();
    public onMessageTimestampChange = new EventEmitter<boolean>();
    public onThemeChange = new EventEmitter<string>();

    constructor() {
        const theme = this.getTheme();
        if(theme === "dark"){
            document.body.classList.add("dark-theme");
        }
        else{
            document.body.classList.remove("dark-theme");
        }
    }

    public setTheme(value: string){
        localStorage.setItem("settings-theme", JSON.stringify(value));
        const classes = document.body.classList;
        if(value === "dark"){
            classes.add("dark-theme");
        }
        else{
            classes.remove("dark-theme");
        }
        this.onThemeChange.emit(value);
    }

    public getTheme(): string{
        const theme = localStorage.getItem("settings-theme");
        if(theme === null){
            return isDarkModePrefered() ? "dark" : "light"; // default value
        }
        return JSON.parse(theme);
    }

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

    public setMessageTimestamp(value: boolean){
        localStorage.setItem("settings-message-timestamp", JSON.stringify(value));
        this.onMessageTimestampChange.emit(value);
    }

    public getMessageTimestamp(): boolean{
        const messageTimestamp = localStorage.getItem("settings-message-timestamp");
        if(messageTimestamp === null){
            return true; // default value
        }
        return JSON.parse(messageTimestamp);
    }
}

function isDarkModePrefered(){
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
