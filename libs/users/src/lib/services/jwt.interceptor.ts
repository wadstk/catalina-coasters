import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localStorageToken: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageToken.getToken();
    const isAPIURL = request.url.startsWith(environment.apiURL);

    if(token && isAPIURL) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
