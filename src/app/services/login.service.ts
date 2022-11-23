import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // genrating token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // save token to localStorage

  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // check if user is loged in or not

  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token !== null || token !== '' || token !== undefined) {
      return true;
    }
    return false;
  }

  // logout user

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    return user.authorities[0].authority;
  }
}
