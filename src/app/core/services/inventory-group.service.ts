import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryGroup } from '../models/inventory-group';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryGroupService {

  private baseUrl: string = environment.apiBaseUrl + "/inventory-group";
  // private baseUrl: string = "http://127.0.0.1:8090/inventory-group";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<InventoryGroup[]> {
    return this.http.get<InventoryGroup[]>(`${this.baseUrl}/all`);
  }

  getAllWithChildren(): Observable<InventoryGroup[]> {
    return this.http.get<InventoryGroup[]>(`${this.baseUrl}/allWithChildren`);
  }

  get(id: any): Observable<InventoryGroup> {
    return this.http.get<InventoryGroup>(`${this.baseUrl}/find/${id}`);
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

