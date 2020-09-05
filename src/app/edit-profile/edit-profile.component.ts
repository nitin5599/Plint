import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import {first} from "rxjs/operators";


export interface User {
  employee_code: number;
  name: String;
  email: String;
  role: String;
  is_expense_manager_user: boolean;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager'];
  
  is_expense_manager_user: boolean;
  
  editform: FormGroup;
 
  items: Array<any>;
  emp_id: String;
  user_id: String;
  formupdated: boolean = false;
  user: User[];
  data: any;
  
  constructor(public userservice: UsercrudService,private toastr: ToastrService,private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  {
    this.editform = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      name: ['', Validators.required],
      role: ['', Validators.required],
      is_expense_manager_user: [ Validators.required],
      employee_code: ['', Validators.required],
  });
  
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.emp_id = this.actRoute.snapshot.params.emp_id;
  }

  ngOnInit(): void {
    
  let data = JSON.parse(localStorage.getItem('Users'));
  for (var index in data) 
  {
    if(this.emp_id == data[index].employee_code)
    {
      this.editform = new FormGroup({
        'employee_code': new FormControl( data[index].employee_code),
        'name': new FormControl(data[index].name),
        'role': new FormControl(data[index].role),
        'email': new FormControl(data[index].email),
        'is_expense_manager_user': new FormControl(data[index].is_expense_manager_user)
      })
    break;
    }
  }
   
  }

  
showupdate() 
{
  this.toastr.success('updated successfully!');
}

onUpdate()
{
  this.userservice.updateUser(this.editform.value, this.user_id)
  .pipe(first())
  .subscribe(
    data => {
      if(data.message == 'Done') {
        this.showupdate();
        this.router.navigate(['user-profile']);
      }
      else
      { 
        this.toastr.error('Error', 'Try again', {
        timeOut: 3000,
        });
       }
    },
    error => {
      alert(error);
    });

}

}
