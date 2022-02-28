import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor runs");
    // if(httpRequest.url.includes(`${this.authenticationService.baseUrl}/login`)) {
    if(httpRequest.url.includes(`/login`)) {
      // do nothing
      return httpHandler.handle(httpRequest);
    }

    // if(httpRequest.url.includes(`${this.authenticationService.baseUrl}/login`)) {
    //   // do nothing
    //   return httpHandler.handle(httpRequest);
    // }

    // if(httpRequest.url.includes(`${this.authenticationService.baseUrl}/login`)) {
    //   // do nothing
    //   return httpHandler.handle(httpRequest);
    // }

    this.authenticationService.loadToken();
    const token = this.authenticationService.getToken();
    const modifiedRequest = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return httpHandler.handle(modifiedRequest);
  }
}
