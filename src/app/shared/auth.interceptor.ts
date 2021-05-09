import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authservice.getToken();
    if(!token){
      return next.handle(request);
    }
    request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
    })
    return next.handle(request);
  }
}
