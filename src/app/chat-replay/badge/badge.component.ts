import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Component } from '@angular/core';
import { BadgesCollectionService } from './badges-collection.service';
import { Badge } from './badges.model';

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

    constructor(private badgeCollection: BadgesCollectionService){
        badgeCollection.onLoad.subscribe(() => this.ngOnChanges());
    }

    public ngOnChanges(){
        this.badge = this.badgeCollection.lookupBadge(this.id, this.version);
    }
}
