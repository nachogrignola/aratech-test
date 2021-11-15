import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_TOKEN = 'QpwL5tke4Pnpja7X4';
   
    if (request.headers.has("skip")){
      request = request.clone({
      headers: request.headers.delete('skip')
    });
      console.log(request)
      return next.handle(request);
    }

    request = request.clone({setHeaders: {'X-Auth-Token': API_TOKEN}})
    return next.handle(request);
  
  }
}
