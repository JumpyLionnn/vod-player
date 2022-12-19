import { EventEmitter, Injectable } from '@angular/core';
import Badges, { Badge } from './badges.model';
import { DataLoaderService } from '../../data-loader.service';
import { Broadcast } from 'src/app/broadcast.model';

@Injectable({
    providedIn: 'root'
})
export class BadgesCollectionService {

    private globalBadges: Badges = {};
    private localBadges: Badges = {};

    public onLoad: EventEmitter<Broadcast> = new EventEmitter();

    constructor(private loader: DataLoaderService) {
        if(loader.isLoaded){
            this.loadBadges();
        }
        else{
            loader.onLoad.subscribe((data) => this.loadBadges());
        }
        
    }

    public lookupBadge(id: string, version: string): Badge | null{
        if(this.localBadges[id] && this.localBadges[id].versions[version]){
            return this.localBadges[id].versions[version];
        }
        if(this.globalBadges[id] && this.globalBadges[id].versions[version]){
            return this.globalBadges[id].versions[version];
        }
        return null;
    }

    private loadBadges(){
        const localBadgesPromise = fetch(`https://badges.twitch.tv/v1/badges/channels/${this.loader.broadcastData.userId}/display?language=en`)
            .then((response: Response) => response.json())
            .then((badges: {badge_sets: Badges}) => {
                this.localBadges = badges.badge_sets;
            });
        
        const globalBadgesPromise = fetch(`https://badges.twitch.tv/v1/badges/global/display?language=en`)
            .then((response: Response) => response.json())
            .then((badges: {badge_sets: Badges}) => {
                this.globalBadges = badges.badge_sets;
            });

        Promise.all([localBadgesPromise, globalBadgesPromise])
            .then(() => {
                this.onLoad.emit();
            });
    }
}
