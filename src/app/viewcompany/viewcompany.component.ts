import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ConfirmService } from '../services/confirm.service'; 
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-viewcompany',
  templateUrl: './viewcompany.component.html',
  styleUrls: ['./viewcompany.component.css']
})
export class ViewcompanyComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager'];
  
  is_expense_manager_user: boolean;
  
  userform: FormGroup;
 
  items: Array<any>;

  user: any = {};

  constructor(public userservice: UsercrudService, private conf: ConfirmService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
  }

  showSubmit() {
    this.toastr.success('submitted successfully!');
  }
  
  showupdate() {
    this.toastr.success('updated successfully!');
  }
  
  showDelete() {
    this.toastr.success('Deleted successfully!');
  }
  
    // deluser(_id: String)
    // {
    //   this.conf.OpenDialog('Are you sure you want to delete this record?')
    //   .afterClosed().subscribe(res => {
    //     // console.log(res)
    //     if(res)
    //     {
    //       this.userservice.deleteUser(_id)
    //       .subscribe((val) => {
    //         console.log(val)
    //         this.showDelete();
    //         this.getData();
    //       });
    //     }
    //   });
      
    // }
  
    getData(){
      this.http.get<any>('https://api.plint.in/dsr/companies/list').subscribe(res => {
        this.items = res.data;
        console.log(this.items)
      });  
    }
  
    
  
}
