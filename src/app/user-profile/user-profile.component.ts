import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { data } from 'jquery';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

export interface User {
  employee_code: number;
  name: String;
  email: String;
  role: String;
  is_expense_manager_user: boolean;
}


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager'];
  
  is_expense_manager_user: boolean;
  
  userform: FormGroup;
 
  items: Array<any>;

  user: any = {};

  constructor(public userservice: UsercrudService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

  ngOnInit() {

    this.userform = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      name: ['', Validators.required],
      role: ['', Validators.required],
      is_expense_manager_user: [ Validators.required],
      employee_code: ['', Validators.required],
  });

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

  onSubmit()
  {
    if(this.userform.valid)
    {     
        this.userservice.createUser(this.userform.value)
        .subscribe(data => {
          this.showSubmit();
          this.getData();
        });

        this.reset();
    }
    else 
      { 
       this.toastr.error('Error', 'Try again', {
       timeOut: 3000,
       });
      }

  }

  addUser(user)
  {
    let users = [];
    if(localStorage.getItem('Users'))
    {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    }
    else
    {
      users = [user];  
    }
    localStorage.setItem('Users', JSON.stringify(users));
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
    this.http.get<any>('http://15.207.181.67:3000/admin/users?nonAdminUsers=false').subscribe(res => {
      this.items = res.data;
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
