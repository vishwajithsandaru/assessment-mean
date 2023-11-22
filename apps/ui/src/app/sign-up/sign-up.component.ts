import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiResponse, UserData } from '../interfaces/types';

@Component({
  selector: 'assessment-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  form = {
    username: null,
    email: null,
    password: null,
    confirmpassword: null,
  };

  error = false;
  errorMsg = 'Test Error';

  constructor(private authService: AuthService, private router: Router) {}

  public onSubmit(): void {
    this.error = false;

    const { username, email, password, confirmpassword } = this.form;

    if (password != confirmpassword) {
      this.error = true;
      this.errorMsg = 'Password Mismatch';
    }

    if (!this.error && username != null && email != null && password != null) {
      this.authService.signup(username, email, password).subscribe({
        next: (res) => {
          const response = res as ApiResponse;
          console.log(response.token);

          // localStorage.removeItem("user_token");
          // localStorage.setItem("user_token", response.token);

          // localStorage.removeItem("user_id");
          // localStorage.setItem("user_id", username);

          // localStorage.removeItem("user_email");
          // localStorage.setItem("user_email", email);

          const user_data: UserData = {
            userid: username,
            useremail: email,
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
