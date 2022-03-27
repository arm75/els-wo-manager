import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryLocation } from '../models/inventory-location';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class InventoryLocationService {

  private baseUrl: string = environment.apiBaseUrl + "/inventory-location";
  // private baseUrl: string = "http://127.0.0.1:8090/inventory-location";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<InventoryLocation[]> {
    return this.http.get<InventoryLocation[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<InventoryLocation> {
    return this.http.get<InventoryLocation>(`${this.baseUrl}/find/${id}`);
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

