import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    userName: '',
    password: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  loginFormSubimt() {
    if (
      (this.loginData.password.trim() === '' ||
        this.loginData.password === null) &&
      (this.loginData.userName.trim() === '' ||
        this.loginData.userName === null)
    ) {
      this.snackBar.open('userName and Password is required', '', {
        duration: 2000,
      });
    } else if (
      this.loginData.userName.trim() === '' ||
      this.loginData.userName === null
    ) {
      this.snackBar.open('userName is required', '', {
        duration: 2000,
      });
    } else if (
      this.loginData.password.trim() === '' ||
      this.loginData.password === null
    ) {
      this.snackBar.open('Password is required', '', {
        duration: 2000,
      });
    } else {
      this.loginService.generateToken(this.loginData).subscribe(
        (data) => {
          console.log('success');
          console.log(data);
        },
        (error) => {
          console.log('error');
          console.log(error);
        }
      );
    }
  }
}
