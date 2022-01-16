import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToolEquipment } from '../models/tool-equipment';

@Injectable({
  providedIn: 'root'
})
export class ToolEquipmentService {

  private _url: string = "http://127.0.0.1:8090/tool-equipment/all";

  constructor( private http: HttpClient ) { }

  getToolsEquipment(): Observable<ToolEquipment[]> {

    return this.http.get<ToolEquipment[]>(this._url);

  }

}
