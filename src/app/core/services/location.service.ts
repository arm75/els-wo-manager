import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl: string = environment.apiBaseUrl + "/location";
  // private baseUrl: string = "http://127.0.0.1:8090/location";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/find/${id}`);
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

