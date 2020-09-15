import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-trans-log',
  templateUrl: './trans-log.component.html',
  styleUrls: ['./trans-log.component.css']
})
export class TransLogComponent implements OnInit {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  items: Array<any>;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get<any>('http://15.207.181.67:3000/admin/logs?numDays=3').subscribe(res => {
      this.items = res.data;
    });  
  }

}
