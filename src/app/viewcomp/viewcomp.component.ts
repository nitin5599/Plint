import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-viewcomp',
  templateUrl: './viewcomp.component.html',
  styleUrls: ['./viewcomp.component.css']
})
export class ViewcompComponent implements OnInit {


  Url: string = 'https://api.plint.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  user_id: string;
  tripId: string;
  items: Array<any>;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  {
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    // console.log(this.user_id);
    this.getCompanyData();
  }

  getCompanyData(){
    let API_URL = `${this.Url}/dsr/users/`+this.user_id+`/companies/list`;
    this.http.get<any>(`${API_URL}`)
     .subscribe(res => {
      this.items = res.data;
      console.log(res);
    });
  }

}
