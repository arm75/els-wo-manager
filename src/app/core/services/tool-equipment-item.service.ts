import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToolEquipmentItem } from '../models/tool-equipment-item';

@Injectable({
  providedIn: 'root'
})
export class ToolEquipmentItemService {

  private _url: string = "http://127.0.0.1:8090/tool-equipment-item/all";

  constructor( private http: HttpClient ) { }

  getToolsEquipmentItems(): Observable<ToolEquipmentItem[]> {

    return this.http.get<ToolEquipmentItem[]>(this._url);

  }

}
