import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url: string = "http://127.0.0.1:8090/user/all";

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this._url);

  }

}
