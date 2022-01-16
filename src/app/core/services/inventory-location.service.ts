import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryLocation } from '../models/inventory-location';

@Injectable({
  providedIn: 'root'
})
export class InventoryLocationService {

  private _url: string = "http://127.0.0.1:8090/inventory-location/all";

  constructor( private http: HttpClient ) { }

  getInventoryLocations(): Observable<InventoryLocation[]> {

    return this.http.get<InventoryLocation[]>(this._url);

  }

}
