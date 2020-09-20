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

  Url: string = 'https://api.plint.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  items: Array<any>;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.http.get<any>('https://api.plint.in/admin/logs?numDays=3').subscribe(res => {
      this.items = res.data;
    });  
  }

}
