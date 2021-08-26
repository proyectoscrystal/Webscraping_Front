import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { AppSettings } from '../config/constants';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = AppSettings.Api

  constructor(private http: HttpClient,  private router: Router) { }

  signUp(user) {
    return this.http.post<any>(this.url + '/register', user);
  }

  signIn(user) {
    return this.http.post<any>(this.url + '/login', user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
