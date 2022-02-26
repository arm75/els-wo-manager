import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaborItem } from '../models/labor-item';


@Injectable({
  providedIn: 'root'
})
export class LaborItemService {

  private baseUrl: string = "http://127.0.0.1:8090/labor-item";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<LaborItem[]> {
    return this.http.get<LaborItem[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<LaborItem> {
    return this.http.get<LaborItem>(`${this.baseUrl}/find/${id}`);
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
  
