import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl: string = environment.apiBaseUrl + "/inventory";
  // private baseUrl: string = "http://127.0.0.1:8090/inventory";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.baseUrl}/find/${id}`);
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

