import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usertrip',
  templateUrl: './usertrip.component.html',
  styleUrls: ['./usertrip.component.css']
})

export class UsertripComponent implements OnInit {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  user_id: string;
  tripId: string;
  items: Array<any>;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  {
    this.user_id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get<any>('http://15.207.181.67:3000/admin/users?nonAdminUsers=false').subscribe(res => {
      this.items = res.data;
      // console.log(this.items);
    });  
  }

}
