import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User} from '../user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UsercrudService {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  isLogged: boolean = false;

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

}

