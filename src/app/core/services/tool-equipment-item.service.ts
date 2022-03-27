import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToolEquipmentItem } from '../models/tool-equipment-item';
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ToolEquipmentItemService {

  private baseUrl: string = environment.apiBaseUrl + "/tool-equipment-item";
  // private baseUrl: string = "http://127.0.0.1:8090/tool-equipment-item";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<ToolEquipmentItem[]> {
    return this.http.get<ToolEquipmentItem[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<ToolEquipmentItem> {
    return this.http.get<ToolEquipmentItem>(`${this.baseUrl}/find/${id}`);
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

