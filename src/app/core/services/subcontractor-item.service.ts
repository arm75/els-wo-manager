import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubcontractorItem } from '../models/subcontractor-item';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SubcontractorItemService {

  private baseUrl: string = environment.apiBaseUrl + "/subcontractor-item";
  // private baseUrl: string = "http://127.0.0.1:8090/subcontractor-item";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<SubcontractorItem[]> {
    return this.http.get<SubcontractorItem[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<SubcontractorItem> {
    return this.http.get<SubcontractorItem>(`${this.baseUrl}/find/${id}`);
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

