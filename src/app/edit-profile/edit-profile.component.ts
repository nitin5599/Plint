import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { first } from "rxjs/operators";
import { Location } from '@angular/common';

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
 
  items: [];
  emp_id: String;
  user_id: String;
  formupdated: boolean = false;
  user: User[];
  data: any;
  pos: any;

  datalist: [];
  
  constructor(public userservice: UsercrudService,private toastr: ToastrService, private location: Location, private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
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

    this.pos = this.actRoute.snapshot.params.i;
  }
  

  ngOnInit(): void {
    this.http.get<any>('http://15.207.181.67:3000/admin/users?nonAdminUsers=false').subscribe(res => {
      this.items = res.data;
      for (var index in res.data) 
      {
        if(this.user_id == res.data[index]._id)
        {
          this.editform = new FormGroup({
            employee_code: new FormControl(res.data[index].employee_code),
            name: new FormControl(res.data[index].name),
            role: new FormControl(res.data[index].role),
            email: new FormControl(res.data[index].email),
            is_expense_manager_user: new FormControl(res.data[index].is_expense_manager_user)
          })
        break;
        }
      }
    });  
 
  }

  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
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
