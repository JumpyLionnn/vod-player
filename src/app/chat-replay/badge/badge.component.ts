import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import { BadgesCollectionService } from './badges-collection.service';
import { Badge } from './badges.model';
import { DataLoaderService } from '../../data-loader.service';

@Component({
    selector: 'app-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnChanges {
    @Input()
    public id: string = "";
    @Input()
    public version: string = "";

    public badge: Badge | null = null;

    public url: string | null = null;

    constructor(private badgeCollection: BadgesCollectionService, private loader: DataLoaderService){
        badgeCollection.onLoad.subscribe(() => this.ngOnChanges());
    }

    public ngOnChanges(){
        this.badge = this.badgeCollection.lookupBadge(this.id, this.version);
        if(this.badge !== null){
            if(this.badge.click_action === "visit_url"){
                this.url = this.badge.click_url;
            }
            if(this.badge.click_action === "subscribe_to_channel"){
                this.url = `https://www.twitch.tv/subs/${this.loader.broadcastData.username.toLowerCase()}`;
            }
        }
    }
}
