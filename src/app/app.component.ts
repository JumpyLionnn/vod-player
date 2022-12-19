import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Broadcast } from './broadcast.model';
import { DataLoaderService } from './data-loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    public broadcastData?: Broadcast;

    constructor(private loader: DataLoaderService) {
         loader.onLoad.subscribe((data) => {
            this.broadcastData = data;
         });
    }
}
