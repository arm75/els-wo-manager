import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private _url: string = "http://127.0.0.1:8090/inventory/all";

  constructor( private http: HttpClient ) { }

  getInventory(): Observable<Inventory[]> {

    return this.http.get<Inventory[]>(this._url);

  }

}
