import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrder } from '../models/work-order';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  private _url: string = "http://127.0.0.1:8090/work-order/all";

  constructor( private http: HttpClient ) { }

  getWorkOrders(): Observable<WorkOrder[]> {

    return this.http.get<WorkOrder[]>(this._url);

  }

}
