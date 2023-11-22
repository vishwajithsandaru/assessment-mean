import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/types';

const BASE_URL = 'http://localhost:3333/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router,
    public http: HttpClient
  ) {}

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      console.log('Not Authenticated');
      this.router.navigate(['signin']);
      return false;
    }

    return true;
  }

  public isAuthenticated(): boolean {
    const user_data = localStorage.getItem('user_data');

    if(user_data){
      const user_data_model = JSON.parse(user_data) as UserData;
      return !this.jwtHelper.isTokenExpired(user_data_model.token);
    }

    return false;
  }

  public login(username: string, password: string): Observable<unknown> {
    return this.http.post(
      BASE_URL + '/signin',
      { username, password },
      httpOptions
    );
  }

  public signup(
    username: string,
    email: string,
    password: string
  ): Observable<unknown> {
    return this.http.post(
      BASE_URL + '/signup',
      { username, email, password },
      httpOptions
    );
  }

  public signOut(): void {
    localStorage.removeItem('user_data');
    console.log('Signing Out');
    this.router.navigate(['signin']);
  }
}