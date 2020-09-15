import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-singleusertrip',
  templateUrl: './singleusertrip.component.html',
  styleUrls: ['./singleusertrip.component.css']
})
export class SingleusertripComponent implements OnInit {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  user_id: string;
  items: [];
  count: any = true;

  constructor(public userservice: UsercrudService, private dialog: MatDialog, private toastr: ToastrService,private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  { 
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
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

  OngoingTrip()
  { 
    let API_URL = `${this.Url}/em/user/`+this.user_id+`/trip/list`;
    return this.http.get<any>(`${API_URL}`)
    // .subscribe(res => {
    //   this.items = res.data;
    // });
  }



}
