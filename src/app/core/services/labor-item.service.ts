import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaborItem } from '../models/labor-item';

@Injectable({
  providedIn: 'root'
})
export class LaborItemService {

  private _url: string = "http://127.0.0.1:8090/labor-item/all";

  constructor( private http: HttpClient ) { }

  getLaborItems(): Observable<LaborItem[]> {

    return this.http.get<LaborItem[]>(this._url);

  }

}
