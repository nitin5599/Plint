import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})

export class UserslistComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager'];
  
  is_expense_manager_user: boolean;
  
  userform: FormGroup;
 
  items: Array<any>;

  user: any = {};

  constructor(public userservice: UsercrudService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

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
  
    deluser(_id: String)
    {
      this.userservice.deleteUser(_id)
      .subscribe((val) => {
        console.log(val)
        this.showDelete();
        this.getData();
      });
    }
  
    getData(){
      this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res => {
        this.items = res.data;
        // console.log(this.items)
      });  
    }
  
    reset()
    {
    this.userform = this.fb.group({
      employee_code: "",
      name: "",
      email: "",
      role: "",
      is_expense_manager_user: "",    
    });
    }
  

}
