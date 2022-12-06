import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public loginStatus = new Subject<boolean>(); // making subject so that we can send subject when ever user logged in or logged out and get notified . check this on login.component.ts

  // genrating token
  public generateToken(loginData: any) {
    localStorage.clear();
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // save token to localStorage

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // check if user is loged in or not

  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token !== null && token !== '' && token !== undefined) {
      return true;
    }
    return false;
  }

  // logout user

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatus.next(true);
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem('token');
  }

  // set user detials

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get user

  public getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }

  // get user role

  public getUserRole() {
    let user = this.getUser();
    if (user != null) return user.authorities[0].authority;
    return null;
  }

  // get current user

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }
}
