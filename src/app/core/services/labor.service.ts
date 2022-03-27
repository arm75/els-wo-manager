import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Labor } from '../models/labor';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LaborService {

  private baseUrl: string = environment.apiBaseUrl + "/labor";
  // private baseUrl: string = "http://127.0.0.1:8090/labor";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Labor[]> {
    return this.http.get<Labor[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Labor> {
    return this.http.get<Labor>(`${this.baseUrl}/find/${id}`);
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

