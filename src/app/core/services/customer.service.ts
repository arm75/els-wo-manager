import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl: string = "http://127.0.0.1:8090/customer";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/find/${id}`);
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
  
