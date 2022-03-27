import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcontractor } from '../models/subcontractor';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SubcontractorService {

  private baseUrl: string = environment.apiBaseUrl + "/subcontractor";
  // private baseUrl: string = "http://127.0.0.1:8090/subcontractor";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Subcontractor[]> {
    return this.http.get<Subcontractor[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Subcontractor> {
    return this.http.get<Subcontractor>(`${this.baseUrl}/find/${id}`);
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

