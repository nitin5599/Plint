import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from 'app/confirm/confirm.component';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  OpenDialog(msg)
  {
  return this.dialog.open(ConfirmComponent,{
     width: '390px',
     position:{
       top: '10px'
     },
     data:{
           message: msg
     },
    //  panelClass: 'confirm-dialog-container',
     disableClose: true
   })
  }

}
