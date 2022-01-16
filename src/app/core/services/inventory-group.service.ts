import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryGroup } from '../models/inventory-group';

@Injectable({
  providedIn: 'root'
})
export class InventoryGroupService {

  private _url: string = "http://127.0.0.1:8090/inventory-group/all";

  constructor( private http: HttpClient ) { }

  getInventoryGroups(): Observable<InventoryGroup[]> {

    return this.http.get<InventoryGroup[]>(this._url);

  }

}
