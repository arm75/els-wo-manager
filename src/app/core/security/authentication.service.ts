import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = environment.apiBaseUrl + "/user";
  private token: any;
  private loggedInUsername: any;
  private stringUser!: any;
  private jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // login
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.baseUrl}/login`, user, { observe: 'response' });
  }

  // logout
  public logout(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    this.router.navigateByUrl('/login');
  }

  // saveTokenToLocalStorage
  public saveTokenToLocalStorage(token: string): void {
    this.token = token;
    this.loggedInUsername = null;
    localStorage.setItem('token', this.token);
  }

  // saveUserToLocalStorage
  public saveUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUserFromLocalStorage
  public getUserFromLocalStorage(): User | null {
    if (localStorage.getItem('user') != null) {
      this.stringUser = localStorage.getItem('user');
      // console.log(this.stringUser);
      return JSON.parse(this.stringUser);
    } else {
      return null;
    }
  }

  // public getRoleFromLocalStorage(): User | null {
  //   if (localStorage.getItem('user') != null) {
  //     this.stringRole = localStorage.getItem('role');
  //     // console.log(this.stringUser);
  //     return JSON.parse(this.stringRole);
  //   } else {
  //     return null;
  //   }
  // }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== '') {
      if(this.jwtHelperService.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelperService.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelperService.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
    }
    return false;
  }
















}
