import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CurrTrans } from '../models/currtrans.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  user_id: string;
  trip_id: string;

  constructor(private http: HttpClient, private actRoute: ActivatedRoute ) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.trip_id = this.actRoute.snapshot.params.trip_id;
  }
  
  Triptrans(): Observable<any>
  { 
    let API_URL: string = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?sortBy=created_on&sortOrder=desc'; 
    return this.http.get<any>(API_URL);
  }
}
