import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _url: string = "http://127.0.0.1:8090/location/all";

  constructor( private http: HttpClient ) { }

  getLocations(): Observable<Location[]> {

    return this.http.get<Location[]>(this._url);

  }

}
