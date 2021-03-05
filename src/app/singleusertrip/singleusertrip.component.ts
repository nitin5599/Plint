import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-singleusertrip',
  templateUrl: './singleusertrip.component.html',
  styleUrls: ['./singleusertrip.component.css']
})
export class SingleusertripComponent implements OnInit {

  Url: string = 'https://api.plint.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  user_id: string;
  items: [];
  user: [];
  count: any = true;
  trip_id;
  sheet;
  showuser = [];

   arrayObj : any;
   objectData : any;
len;
  constructor(public userservice: UsercrudService, private dialog: MatDialog, private location: Location, private toastr: ToastrService,private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  { 
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    this.getData();
    this.http.get<any>('https://api.plint.in/admin/users?emUsersOnly=true&nonAdminUsers=false').subscribe(res => {
      this.user = res.data;
      // console.log(this.user);


        
      // for (var index in res.data) 
      // {
      //   if(this.user_id == res.data[index]._id)
      //   { 
      //     let showuser = [];
      //     showuser = [...res.data[index]];        
      //     this.showuser = [...res.data[index]]; 
      //     // this.showuser.push(
      //     // //  var since = 
      //     //  {
      //     //       "employee_code":res.data[index].employee_code,
      //     //       "name":res.data[index].name,
      //     //       "email":res.data[index].email,
      //     //       "role":res.data[index].role,
      //     //    }
      //     // );
      // // console.log(res.data[index]);  
      //   }
        
      //   // console.log(showuser);
      //   console.log(this.showuser);
      // break;      
      // }
  
    });  

    
    this.OngoingTrip().subscribe(res =>{
      // console.log(res);   
      this.items = res.data;
         for (var index in res.data) 
         {
           if(res.data[index].ongoing)
           {
             this.count = false;
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

  OngoingTrip()
  { 
    let API_URL = `${this.Url}/em/user/`+this.user_id+`/trip/list`;
    return this.http.get<any>(`${API_URL}`)
    // .subscribe(res => {
    //   this.items = res.data;
    // });
  }

  LinkGenerated() 
{
  this.toastr.success('You can dwonload now!');
}
  Generate_sheet(trip_id)
  {
    let API_URL = `${this.Url}/admin/trip/`+trip_id+`/expenseSheet`;
    return this.http.get<any>(`${API_URL}`)
    .subscribe(res => {
      this.LinkGenerated();
      this.ngOnInit();
      // console.log(res.data.last_generated_expense_sheet_url);
      //       console.log(res.data.expense_sheet_url);
      // this.sheet = res.data.last_generated_expense_sheet_url;
       
    });

  }

  getData(){
    this.http.get<any>('https://api.plint.in/admin/users?emUsersOnly=true&nonAdminUsers=false').subscribe(res => {
      this.user = res.data;
      this.len =  res.data.length;
      // console.log(this.user);

    });  
      for (let index = 0; index < this.len; index++) 
      {
        this.arrayObj = this.user[index];
        this.arrayObj.filter((x) => {
          if (x.id === this.user_id) 
          {
            this.objectData = x;
          }
        });
        console.log('Json Object Data by ID ==> ', this.objectData);
      }
    
  }

}


