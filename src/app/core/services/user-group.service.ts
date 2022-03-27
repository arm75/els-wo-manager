import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGroup } from '../models/user-group';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private baseUrl: string = environment.apiBaseUrl + "/user-group";
  // private baseUrl: string = "http://127.0.0.1:8090/user-group/all";

  constructor( private http: HttpClient ) { }

  getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${this.baseUrl}/all`);
  }
}
