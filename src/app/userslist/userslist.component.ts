import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ConfirmService } from '../services/confirm.service'; 
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { data } from 'jquery';
import { AttdialogComponent} from '../attdialog/attdialog.component';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})

export class UserslistComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager'];
  
  is_expense_manager_user: boolean;
  
  userform: FormGroup;
 
  items: Array<any>;
  att: Array<any>;
  user: any = {};
  day_start;
  day_end;
  dt: Date;
  location;
  dialogValue: string;
  showModal: boolean;

  constructor(public userservice: UsercrudService,  private conf: ConfirmService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

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
      this.conf.OpenDialog('Are you sure you want to delete this record?')
      .afterClosed().subscribe(res => {
        // console.log(res)
        if(res)
        {
          this.userservice.deleteUser(_id).subscribe((val) => {
            // console.log(val)
            this.showDelete();
            this.getData();
          });
        }
      });
      
    }
    
    makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
      for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
    
    resetuser(_id: String)
    {
      this.conf.OpenDialog('Are you sure you want to reset your password?')
      .afterClosed().subscribe(res => {
        // console.log(res)
        if(res)
        { 
          let pass = this.makeid();          
          const httpOptions = {
            headers: this.headers,
            "password": pass
          }; 

          this.http.post<any>('https://api.plint.in/admin/users/'+_id+'/reset', httpOptions).subscribe(response => {
            if(response)
            this.toastr.success("Password changed successfully");
            else
            this.toastr.error('Try Again!');
          }); 
        }
      });
      
    }

    viewatt(_id)
    {
      // const dialogRef = 
      this.dialog.open(AttdialogComponent, {
        width: '350',
        data: { userid: _id }
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed', result);
      //   this.dialogValue = result.data;
      // });

      // this.showModal = true;
      // this.http.get<any>('https://api.plint.in/dsr/users/'+_id+'/dayLog').subscribe(res => {
      //   this.att = res.data;
      //   this.dt = res.data.logs.date;
      //   this.day_start = res.data.logs.day_start;
      //   this.day_end = res.data.logs.day_end;
      //   // console.log(this.att)
      // });  
      
      // this.conf.OpenDialog('')
      // .afterClosed().subscribe(res => {
      //   if(res)
      //   { 
      //   }
      // });
      
    }
  
    show()
    {
      this.showModal = true; 
    }
      
    hide()
    {
      this.showModal = false;
    }

    getData(){
      this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res => {
        this.items = res.data;
        console.log(this.items) 
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
