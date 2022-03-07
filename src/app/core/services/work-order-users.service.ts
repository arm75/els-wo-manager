import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkOrder } from '../models/work-order';


@Injectable({
  providedIn: 'root'
})
export class WorkOrderUsersService {

  private baseUrl: string = "http://127.0.0.1:8090/work-order";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.baseUrl}/find/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  //
}

