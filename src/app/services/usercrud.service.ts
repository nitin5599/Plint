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

  createUser(user: User[]): Observable<any> {
    
    let API_URL = `${this.Url}/auth/users`;
    return this.http.post<User>(`${API_URL}`, user, {headers: this.headers})
    .pipe(
      map((data: any) => {
        return data;
      })
    )
    
  }

  getUsers(){
    let API_URL = `${this.Url}/common/users`;
    return this.http.get(`${API_URL}`)
    .pipe(
      map((data: User[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
   )
    }

   // Returns true when user is looged in 
   isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem('access_token');
    return (token !== null) ? true : false;
  }

}

