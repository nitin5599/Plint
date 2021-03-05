import { Component, OnInit, Optional, ViewChild } from '@angular/core';
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
  // parent_user_id: any;
}


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager', 'associate_vice_president'];
  
  is_expense_manager_user: boolean;
  
  userform: FormGroup;
 
  items: Array<any> = [];
  avpitems: Array<any> = [];
  rmitems: Array<any> = [];
  ssmitems: Array<any> = [];
  parent_user_id: Array<any>;

  user: any = {};
  userprofile = [];

  value;
  display: string;
  managervalue:string;

  parentid = [{
    name: 'None',
    value: 'null'
  }]

  constructor(public userservice: UsercrudService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

  ngOnInit() {

    this.userform = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      name: ['', Validators.required],
      role: ['', Validators.required],
      parent_user_id: [''],
      is_expense_manager_user: [''],
      employee_code: ['', Validators.required],
  });

    this.http.get<any>('https://api.plint.in/admin/managers').subscribe(res => {
      this.parent_user_id = res.data;
      // console.log(this.parent_user_id)
    });  
  
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


onEnter(val: string) 
{
  this.value = val; 
  if((this.value == 'admin'))
  {
  this.display = 'false';
  }
  else if(this.value == 'senior_sales_manager')
  {
  this.display = 'true';
  this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res => {
      for(let i=0; i<res.data.length; i++) 
      {
        if((res.data[i].role == 'regional_manager')||(res.data[i].role == 'associate_vice_president'))
        this.ssmitems.push(res.data[i]);
      } 
      console.log(this.ssmitems);
   });  

  }
  else if(this.value == 'regional_manager')
  {
  this.display = 'true';
  this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res => {
      for(let i=0; i<res.data.length; i++) 
      {
        if((res.data[i].role == 'admin')||(res.data[i].role == 'associate_vice_president'))
        this.rmitems.push(res.data[i]);
      } 
      console.log(this.rmitems);
   });  

  }
  else if(this.value == 'associate_vice_president')
  {
  this.display = 'true';
  this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res => {
      for(let i=0; i<res.data.length; i++) 
      {
        if((res.data[i].role == 'admin'))
        this.avpitems.push(res.data[i]);
      }
      console.log(this.avpitems); 
   });  

  }
}

  onSubmit()
  {
    if(this.userform.valid)
    {
      
      // if((this.userform.value.role == "admin")||(this.userform.value.role == "associate_vice_president"))
      // {
      //   let userprofile = [];
      //   userprofile.push({
      //       "email": this.userform.value.email,
      //       "employee_code": this.userform.value.employee_code,
      //       "is_expense_manager_user": this.userform.value.is_expense_manager_user,
      //       "name": this.userform.value.name,
      //       "role": this.userform.value.role,
      //       "parent_user_id": ""
      //     });

        // console.log(this.userform.value);
        
        this.userservice.createUser(this.userform.value)
        .subscribe(data => {
          console.log(data);
          this.showSubmit();
          this.router.navigateByUrl('/userslist');
        });

        // this.reset();
      // }
      // else
      // {
        // console.log(this.userform.value);
        // this.userservice.createUser(this.userform.value)
        // .subscribe(data => {
        //   this.showSubmit();
        //   this.router.navigateByUrl('/userslist');
        // });

        // this.reset();
      // }

    }
    else 
    { 
      console.error();
      
      this.toastr.error('Error', 'Try again', {
      timeOut: 3000,
      });
      
    }

  }
  
  reset()
  {
  this.userform = this.fb.group({
    employee_code: "",
    name: "",
    email: "",
    parent_user_id: "",
    role: "",
    is_expense_manager_user: "",    
  });
  }


}
