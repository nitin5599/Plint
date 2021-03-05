import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ConfirmService } from '../services/confirm.service'; 
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-managerlist',
  templateUrl: './managerlist.component.html',
  styleUrls: ['./managerlist.component.css']
})
export class ManagerlistComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')  
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  // userform: FormGroup;
 
  items: Array<any>;


  constructor(public userservice: UsercrudService, private conf: ConfirmService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getManagers();
  }
  
  getManagers(){
    this.http.get<any>('https://api.plint.in/admin/managers').subscribe(res => {
      this.items = res.data;
      console.log(this.items)
    });  
  }

}
