import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalProgressSpinnerService} from "./global-progress-spinner.service";
import {finalize} from "rxjs/operators";


@Injectable()
export class GlobalProgressSpinnerInterceptor implements HttpInterceptor {

  constructor(
    public globalProgressSpinnerService: GlobalProgressSpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //this.globalProgressSpinnerService.isLoading.next(true);
    return next.handle(request).pipe(finalize(()=>{this.globalProgressSpinnerService.isLoading.next(false)}));
  }
}
