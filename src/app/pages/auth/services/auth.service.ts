import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { URL_SERVICE } from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = "";
  user: any = null;
  URL_BASE = URL_SERVICE + "/auth";
  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    afterNextRender(() => {
      this.initAuth();
    })
  }

  initAuth() {
    if (localStorage.getItem("token")) {
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : null;
      this.token = localStorage.getItem("token");
    }
  }

  login(email: string, password: string) {
    return this.http.post(this.URL_BASE + "/login_tienda", { email, password }).pipe(
      map((res: any) => {
        console.log(res);
        const result = this.saveLocalStorage(res);
        return result;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(err)
      })
    )
  }

  saveLocalStorage(res: any) {
    if (res && res.access_token) {
      localStorage.setItem("token", res.access_token);
      localStorage.setItem("user", JSON.stringify(res.user));
      return true;
    }
    return false;
  }

  register(data: any) {
    return this.http.post(this.URL_BASE + "/register", data);
  }

  verifiedAuth(data: any) {
    return this.http.post(this.URL_BASE + "/verified_auth", data);
  }

  verifiedMail(data: any) {
    return this.http.post(this.URL_BASE + "/verified_email", data);
  }

  verifiedCode(data: any) {
    return this.http.post(this.URL_BASE + "/verified_code", data);
  }

  verifiedNewPassword(data: any) {
    return this.http.post(this.URL_BASE + "/new_password", data);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.user = null;
    this.token = "";
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 500);
  }
}
