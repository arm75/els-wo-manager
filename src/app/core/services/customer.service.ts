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

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/all`);
  }

  getAll(): Observable<Customer[]> {
    // return this.http.get<Customer[]>(this.baseUrl);
    return this.http.get<Customer[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/find/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}?title=${title}`);
  }

}
