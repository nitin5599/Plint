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
  // displayedColumns: string[] = ['Message'];
  
  TotalRecords: String;
  Page: Number = 1;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  { }

  ngOnInit(): void {
    this.getData();
  }
  // ?numDays=3&skip=0&limit=10
  getData(){
    this.http.get<any>('https://api.plint.in/admin/logs').subscribe(res => {
      console.log(res);
      this.items = res.data;
      this.TotalRecords = res.length;
    });  
  }

}
