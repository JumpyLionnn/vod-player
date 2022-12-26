import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private openedDialogs: number = 0;

    constructor(public dialog: MatDialog) { }

    public open<T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R>{
        const dialog = this.dialog.open(component, config);
        this.openedDialogs++;
        dialog.afterClosed().subscribe(() => {
            this.openedDialogs--;
        });
        return dialog;
    }

    public areAnyDialogsOpen(){
        return this.openedDialogs !== 0;
    }
}
