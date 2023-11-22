import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse, TokenS, UserData } from '../interfaces/types';

@Component({
  selector: 'assessment-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  form = {
    username: null,
    password: null,
  };

  isLoggedIn = false;

  error = false;
  errorMsg = 'Test Error';

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    console.log('Val: ' + this.authService.isAuthenticated());
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.router.navigate(['']);
    }
  }

  public onSubmit(): void {
    const { username, password } = this.form;
    console.log('Username: ', username);
    console.log('Password: ', password);

    this.error = false;

    if (username != null && password != null) {
      this.authService.login(username, password).subscribe({
        next: (res) => {
          const response = res as ApiResponse;
          console.log(response.token);

          // localStorage.removeItem('user_token');
          // localStorage.setItem('user_token', response.token);

          const decodedToken = this.jwtHelper.decodeToken(response.token) as TokenS;

          // localStorage.removeItem('user_id');
          // localStorage.setItem('user_id', username);

          // localStorage.removeItem('user_email');
          // localStorage.setItem('user_email', decodedToken.email);

          const user_data: UserData = {
            userid: username,
            useremail: decodedToken.email,
            token: response.token
          }

          localStorage.removeItem("user_data");
          localStorage.setItem("user_data", JSON.stringify(user_data));

          this.router.navigate(['']);
        },
        error: (err) => {
          console.log('Error: ', err.error);
          this.error = true;
          this.errorMsg = err.error.message;
        },
      });
    }
  }
}
