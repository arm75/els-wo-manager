import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Labor } from '../models/labor';

@Injectable({
  providedIn: 'root'
})
export class LaborService {

  private _url: string = "http://127.0.0.1:8090/labor/all";

  constructor( private http: HttpClient ) { }

  getLabor(): Observable<Labor[]> {

    return this.http.get<Labor[]>(this._url);

  }

}
