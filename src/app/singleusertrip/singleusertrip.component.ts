import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient, private actRoute: ActivatedRoute ) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    this.OngoingTrip();
  }

  
  OngoingTrip()
  { 
    let API_URL = `${this.Url}/em/user/`+this.user_id+`/trip/list`;
    this.http.get<any>(`${API_URL}`)
    .subscribe(res => {
      this.items = res.data;
      console.log(this.items);
    });
  }

}
