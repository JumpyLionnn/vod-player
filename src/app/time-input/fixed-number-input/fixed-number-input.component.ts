import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

const digitRegexp = /^\d$/;

export enum Direction{
    Forward,
    Backward
}

@Component({
  selector: 'app-fixed-number-input',
  templateUrl: './fixed-number-input.component.html',
  styleUrls: ['./fixed-number-input.component.scss']
})
export class FixedNumberInputComponent implements OnInit, OnChanges {

    @Input()
    public max: number = 0;

    @Input()
    public disabled: boolean = false;

    @Input("input-class")
    public class: string = "";

    @Output("outofbounds")
    public onOutOfBounds = new EventEmitter<string>();

    @Output("end")
    public onEnd = new EventEmitter();

    @Output("moveleft")
    public onMoveLeft = new EventEmitter();

    @Output("moveright")
    public onMoveRight = new EventEmitter();

    @Output("change")
    public onChange = new EventEmitter();

    @Output("input")
    public onInput = new EventEmitter<number>();
    
    public digitCount: number = 0;

    @ViewChild("input", { static: true }) 
    private input!: ElementRef<HTMLInputElement>;

    @Input()
    public get value(){
        return parseInt(this.text);
    }
    public set value(value){
        this.input.nativeElement.value = Math.min(value, this.max).toString().padStart(this.digitCount, "0");
        this.onInput.emit(this.value);
    }

    private get text(){
        return this.input.nativeElement.value;
    }
    private set text(value: string){
        this.input.nativeElement.value = Math.min(parseInt(value), this.max).toString().padStart(this.digitCount, "0");
        this.onInput.emit(this.value);
    }

    protected _focus: boolean = false;

    ngOnInit(){
        this.digitCount = this.countDigits(this.max);

        this.text = "0".repeat(this.digitCount);
        this.input.nativeElement.value = this.text;
    }

    ngOnChanges(){
        this.digitCount = this.countDigits(this.max);
    }

    public isFocused(){
        return this._focus;
    }

    public focusStart(){
        this.input.nativeElement.focus();
        setTimeout(() => {
            this.input.nativeElement.setSelectionRange(0, 0);
            this.input.nativeElement.selectionStart = 0;
        }, 0);
        
    }

    public focusEnd(offset: number = 0){
        this.input.nativeElement.focus();
        this.input.nativeElement.setSelectionRange(this.text.length - offset, this.text.length - offset);
    }

    public write(char: string){
        const selectionStart = this.input.nativeElement.selectionStart;
        if(selectionStart !== null){
            this.text = this.setCharAt(this.text, selectionStart, char);
            this.input.nativeElement.setSelectionRange(selectionStart, selectionStart);
        }
    }

    protected onKeyDown(event: KeyboardEvent){
        if(event.code.startsWith("Arrow")){
            if(event.code === "ArrowRight"){
                if(this.input.nativeElement.selectionEnd === this.text.length - 1){
                    this.onMoveRight.emit();
                }
            }
            if(event.code === "ArrowLeft"){
                if(this.input.nativeElement.selectionStart === 0){
                    this.onMoveLeft.emit();
                }
            }
            return;
        }
        event.preventDefault();
        let digit: string | null = null;
        if(event.code.startsWith("Digit")){
            digit = event.key;
        }
        else if(event.code.startsWith("Numpad")){
            const suffix = event.code.slice(6);
            if(digitRegexp.test(suffix)){
                digit = suffix;
            }
        }

        if(event.code === "Backspace"){
            this.put(Direction.Backward, "0");
        }

        if(event.code === "Delete"){
            this.put(Direction.Forward, "0");
        }

        if(digit === null){
            return;
        }

        this.put(Direction.Forward, digit);
    }

    protected onPaste(event: Event){
        event.preventDefault();
    }

    private put(direction: Direction, char: string){
        const selectionStart = this.input.nativeElement.selectionStart;
        if(selectionStart !== null){
            const index = selectionStart + (direction === Direction.Forward ? 0 : -1);
            if(index < 0){
                this.onOutOfBounds.emit(char);
                return;
            }
            this.text = this.setCharAt(this.text, index, char);
            const newSelectionIndex = selectionStart + (direction === Direction.Forward ? 1 : -1);
            if(newSelectionIndex >= this.digitCount){
                this.onEnd.emit();
                return;
            }
            this.input.nativeElement.setSelectionRange(newSelectionIndex, newSelectionIndex);
        }
    }

    private setCharAt(str: string, index: number, char: string){
        if(index > str.length-1) return str;
        return str.substring(0,index) + char + str.substring(index+1);
    }

    private countDigits(number: number){
        return (Math.log10((number ^ (number >> 31)) - (number >> 31)) | 0) + 1;
    }
}
