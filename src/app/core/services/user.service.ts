import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {CustomHttpResponse} from "../security/custom-http-response";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.apiBaseUrl + "/user";
  // private baseUrl: string = "http://18.217.185.235:8090/user";
  private stringUsers!: any;

  constructor( private http: HttpClient ) { }

  home(): Observable<User | CustomHttpResponse> {
    return this.http.get<User>(`${this.baseUrl}/home`);
  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  get(id: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/find/${id}`);
  }

  getByUsername(username: any): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/findByUsername/${username}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  addUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromLocalStorage(): User[] | null {
    if(localStorage.getItem('users')) {
      this.stringUsers = localStorage.getItem('users');
      // console.log(this.stringUsers);
      return JSON.parse(this.stringUsers);
    } else {
    return null;
    }
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }
  //
}

