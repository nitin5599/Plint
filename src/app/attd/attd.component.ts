import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ConfirmService } from '../services/confirm.service'; 
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { data } from 'jquery';
import { AttdialogComponent} from '../attdialog/attdialog.component';

@Component({
  selector: 'app-attd',
  templateUrl: './attd.component.html',
  styleUrls: ['./attd.component.css']
})

export class AttdComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  userform: FormGroup;
 
  items: Array<any>;
  att: Array<any>;
  user: any = {};
  user_id;

  s_loc_data: string;
  e_loc_data: string;

  constructor(public userservice: UsercrudService, private actRoute: ActivatedRoute, private conf: ConfirmService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) 
  {    
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    this.viewDialog();
  }

  // viewatt(_id)
  // {
  //   this.dialog.open(AttdialogComponent, {
  //     width: '350',
  //     data: { userid: _id }
  //   });      
  // }

  viewDialog(){
    this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/dayLog').subscribe(res => {
      this.att = res.data.logs;
      console.log(res.data)
    });
  }

  SlocDialog(Sloc_data: String): void {
    const dialogRef = this.dialog.open(startLocation, {
      width: '350px',
      data: {s_loc_data : Sloc_data}
    });

  }
  
  ElocDialog(Eloc_data: String): void {
    const dialogRef = this.dialog.open(endLocation, {
      width: '350px',
      data: {e_loc_data : Eloc_data}
    });
  }

}

@Component({
  selector: 'startLocation',
  templateUrl: 'startLocation.html',
})
export class startLocation {

  startData: String;

  constructor(
    public dialogRef: MatDialogRef<startLocation>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.startData  = data.s_loc_data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'endLocation',
  templateUrl: 'endLocation.html',
})
export class endLocation {

  endData: String;

  constructor(
    public dialogRef: MatDialogRef<endLocation>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.endData = data.e_loc_data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}