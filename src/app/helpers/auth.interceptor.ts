import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { UsercrudService } from '../services/usercrud.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private userservice: UsercrudService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) 
  {
    let authReq = req;
    const token = this.userservice.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
  
}
