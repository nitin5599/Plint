import { Component, OnInit, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-attdialog',
  templateUrl: './attdialog.component.html',
  styleUrls: ['./attdialog.component.css']
})
export class AttdialogComponent implements OnInit {

  fromPage: string;
  fromDialog: string;

  att: any[] = [];
  user: any = {};
  daystart;
  dayend;
  dt;
  location;

  constructor(public dialogRef: MatDialogRef<AttdialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
      this.fromPage = data.userid; 
     }

  ngOnInit(): void {    
    this.viewDialog();
  }

  viewDialog(){
    this.http.get<any>('https://api.plint.in/dsr/users/'+this.fromPage+'/dayLog').subscribe(res => {
      this.att = res.data.logs;
      console.log(res.data)
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

}
