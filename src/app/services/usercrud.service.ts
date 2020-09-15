import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User} from '../user-profile/user-profile.component';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UsercrudService {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));

  isLogged: boolean = false;
  items: [];

  constructor(private http: HttpClient,private toastr: ToastrService, public router: Router) { }

  login(value)
  {
    let API_URL = `${this.Url}/auth/admin/login`;
    return this.http.post<any>(`${API_URL}`, value)
    .subscribe((res: any) => {
      window.sessionStorage.setItem('access_token', res.data.token_info.accessToken);
      this.isLogged = true;
        this.router.navigate(['/user-profile']);
    })
    
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  createUser(user: any): Observable<any> 
  {    
    let API_URL = `${this.Url}/auth/users`;
    return this.http.post<User>(`${API_URL}`, user, {headers: this.headers})
    .pipe(
      map((data: any) => {
        return data;  
      })
    )
    
  }

  updateUser(user, user_id): Observable<any> 
  {
    const headers: HttpHeaders = new HttpHeaders()
    .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    const httpOptions = {
      headers: headers
    };
    let API_URL = `${this.Url}/admin/users`;
    return this.http.put<any>(`${API_URL}/${user_id}` , user, httpOptions);
  }

  deleteUser(user_id: String)
  {
    const headers: HttpHeaders = new HttpHeaders()
    .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    const httpOptions = {
      headers: headers,
      body: {
       "user_id": user_id
      }
    }; 
    let API_URL = `${this.Url}/admin/users`;
    return this.http.delete(`${API_URL}`, httpOptions);
  }

   // Returns true when user is logged in 
   isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem('access_token');
    return (token !== null) ? true : false;
  }

  userStartTrip(emp_id: String, formcombo: any[]): Observable<any>
  {
    const httpOptions = {
        "starting_balance":
         [{
           formcombo,
         }],
          "employee_id": emp_id        
    }; 
  
    console.log(httpOptions)
    let API_URL = `${this.Url}/em/user/trip`;
    return this.http.post<any>(`${API_URL}`, httpOptions, {headers: this.headers})
    .pipe(
      map((data: any) => {
        return data;  
      })
    )
  }


  createTripUsd(emp_id: String, formArr: FormArray)
  {
    const httpOptions = {
        "starting_balance":
         [{
             "holding":
            {
             "currency":formArr.controls["currency"],
             "amount":formArr.controls["amount"]
            },
           "inr_to_usd_conversion_rate":formArr.controls["rate"]
          }],
          "employee_id": emp_id        
    }; 

    console.log(httpOptions)
    // let API_URL = `${this.Url}/em/user/trip`;
    // return this.http.post<any>(`${API_URL}`, httpOptions, {headers: this.headers})
    // .pipe(
    //   map((data: any) => {
    //     return data;  
    //   })
    // )
  }

  createTriplocal(trip_local: any): Observable<any> 
  {
    const httpOptions = 
    {
       "starting_balance": 
       [{
          "holding":
           {
            "amount":trip_local.amount,
            "currency":trip_local.currency
           },
          "usd_to_local_currency_conversion_rate":trip_local.rate  
        }],
        "employee_id": trip_local.employee_id
    }; 
    let API_URL = `${this.Url}/em/user/trip`;
    return this.http.post<any>(`${API_URL}`, httpOptions, {headers: this.headers})
    .pipe(
      map((data: any) => {
        return data;  
      })
    )
  }

}

