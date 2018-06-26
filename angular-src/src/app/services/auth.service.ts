import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";
import { HttpModule } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) {}

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post("users/register", user, {
      headers: headers
    }).pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post("users/authenticate", user, {
      headers: headers
    }).pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append("Content-Type", "application/json");
    return this.http.get("users/profile", {
      headers: headers
    }).pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
