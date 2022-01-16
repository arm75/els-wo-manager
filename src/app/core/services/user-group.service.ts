import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGroup } from '../models/user-group';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private _url: string = "http://127.0.0.1:8090/user-group/all";

  constructor( private http: HttpClient ) { }

  getUserGroups(): Observable<UserGroup[]> {

    return this.http.get<UserGroup[]>(this._url);

  }

}
