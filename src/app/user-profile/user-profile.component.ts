import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';

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

  user: User[];
  

  constructor(public userservice: UsercrudService,private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

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

  onSubmit()
  {
    if(this.userform.valid)
    {     
      var user = {
        employee_code: this.userform.value.employee_code,
        name: this.userform.value.name,
        email: this.userform.value.email,
        role: this.userform.value.role,
        is_expense_manager_user: this.userform.value.is_expense_manager_user
        }
        // console.log(JSON.stringify(user));
        this.http.post('http://15.207.181.67:3000/auth/users', user, {headers: this.headers}).subscribe(data => {
          console.log(data);
      });

      this.showSubmit();
      this.getData();
    }
    else 
      { 
       this.toastr.error('Error', 'Try again', {
       timeOut: 3000,
       });
      }

  }

  getData(){

    this.http.get<any>('http://15.207.181.67:3000/common/users').subscribe(res => {
      this.items = res.data;
    })
  
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
