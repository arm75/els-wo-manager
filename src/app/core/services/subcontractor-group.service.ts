import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubcontractorGroup } from '../models/subcontractor-group';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SubcontractorGroupService {

  //private baseUrl: string = "http://127.0.0.1:8090/subcontractor-group";
  private baseUrl: string = environment.apiBaseUrl + "/subcontractor-group";
  constructor( private http: HttpClient ) { }

  getAll(): Observable<SubcontractorGroup[]> {
    return this.http.get<SubcontractorGroup[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<SubcontractorGroup> {
    return this.http.get<SubcontractorGroup>(`${this.baseUrl}/find/${id}`);
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

