import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubcontractorItem } from '../models/subcontractor-item';

@Injectable({
  providedIn: 'root'
})
export class SubcontractorItemService {

  private _url: string = "http://127.0.0.1:8090/subcontractor-item/all";

  constructor( private http: HttpClient ) { }

  getSubcontractorItems(): Observable<SubcontractorItem[]> {

    return this.http.get<SubcontractorItem[]>(this._url);

  }

}
