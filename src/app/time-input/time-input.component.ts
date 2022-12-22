import { Component, Input, OnInit, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit, OnChanges {

    @Input()
    public disabled: boolean = false;

    // in seconds
    @Input()
    public max: number = 0;

    @Output("change")
    public onChange = new EventEmitter<number>();

    public allowMinutes: boolean = true;
    public allowHours: boolean = true;

    public time: number = 0;

    public seconds: number = 0;
    public minutes: number = 0;
    public hours: number = 0;

    //imports
    Math = Math;

    constructor(private changeDetector: ChangeDetectorRef){}

    public ngOnInit(){
        this.recalculateMaxProperties();
    }

    public ngOnChanges(){
        this.recalculateMaxProperties();
    }

    public set(time: number){
        this.hours = Math.floor(time / 3600);
        this.minutes = Math.floor((time - 3600 * this.hours) / 60);
        this.seconds = Math.floor(time - this.minutes * 60 - this.hours * 3600);
        this.changeDetector.detectChanges();
    }

    protected onSecondsUpdated(value: number){
        this.seconds = value;
        this.recalculateTime();
    }

    protected onMinutesUpdated(value: number){
        this.minutes = value;
        this.recalculateTime();
    }

    protected onHoursUpdated(value: number){
        this.hours = value;
        this.recalculateTime();
    }

    private recalculateTime(){
        this.time = this.hours * 3600 + this.minutes * 60 + this.seconds;
        this.onChange.emit(this.time);
    }

    private recalculateMaxProperties(){
        if(this.max === 0){
            this.allowMinutes = true;
            this.allowHours = true;
        }
        else{
            this.allowMinutes = false;
            this.allowHours = false;

            if(this.max / (60 * 60) >= 1){
                this.allowHours = true;
            }
            if(this.max / 60 >= 1){
                this.allowMinutes = true;
            }
        }
    }
}
