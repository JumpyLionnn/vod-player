import { Component } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public title: string = "";

    constructor(loader: DataLoaderService){
        if(loader.isLoaded){
            this.title = loader.broadcastData.title;
        }
        else{
            loader.onLoad.subscribe((data) => {
                this.title = data.title;
            });
        }
    }
}
