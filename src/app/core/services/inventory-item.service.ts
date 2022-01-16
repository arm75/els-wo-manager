import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService {

  private _url: string = "http://127.0.0.1:8090/inventory-item/all";

  constructor( private http: HttpClient ) { }

  getInventoryItems(): Observable<InventoryItem[]> {

    return this.http.get<InventoryItem[]>(this._url);

  }

}
