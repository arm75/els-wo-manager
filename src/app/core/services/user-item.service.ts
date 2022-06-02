import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserItem} from "../models/user-item";

@Injectable({
  providedIn: 'root'
})
export class UserItemService {

  private baseUrl: string = environment.apiBaseUrl + "/user-item";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<UserItem> {
    return this.http.get<UserItem>(`${this.baseUrl}/find/${id}`);
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

}
