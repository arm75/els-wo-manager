import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcontractor } from '../models/subcontractor';

@Injectable({
  providedIn: 'root'
})
export class SubcontractorService {

  private _url: string = "http://127.0.0.1:8090/subcontractor/all";

  constructor( private http: HttpClient ) { }

  getSubcontractors(): Observable<Subcontractor[]> {

    return this.http.get<Subcontractor[]>(this._url);

  }

}
