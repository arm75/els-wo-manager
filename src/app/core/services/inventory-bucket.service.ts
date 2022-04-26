import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InventoryBucket } from "../models/inventory-bucket";

@Injectable({
  providedIn: 'root'
})
export class InventoryBucketService {

  private baseUrl: string = environment.apiBaseUrl + "/inventory-bucket";
  // private baseUrl: string = "http://127.0.0.1:8090/inventory";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<InventoryBucket[]> {
    return this.http.get<InventoryBucket[]>(`${this.baseUrl}/all`);
  }

  getAllByInventoryId(id: any): Observable<InventoryBucket[]> {
    return this.http.get<InventoryBucket[]>(`${this.baseUrl}/allByInventoryId/${id}`);
  }

  getAllNonEmptyByInventoryId(id: any): Observable<InventoryBucket[]> {
    return this.http.get<InventoryBucket[]>(`${this.baseUrl}/allNonEmptyByInventoryId/${id}`);
  }

  get(id: any): Observable<InventoryBucket> {
    return this.http.get<InventoryBucket>(`${this.baseUrl}/find/${id}`);
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
