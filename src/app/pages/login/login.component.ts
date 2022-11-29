import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginFormSubimt() {
    if (
      (this.loginData.password.trim() === '' ||
        this.loginData.password === null) &&
      (this.loginData.username.trim() === '' ||
        this.loginData.username === null)
    ) {
      this.snackBar.open('username and Password is required', '', {
        duration: 2000,
      });
    } else if (
      this.loginData.username.trim() === '' ||
      this.loginData.username === null
    ) {
      this.snackBar.open('username is required', '', {
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
        (data: any) => {
          console.log('success');
          console.log(data);

          this.loginService.loginUser(data.token);

          this.loginService.getCurrentUser().subscribe(
            (user) => {
              this.loginService.setUser(user);
              console.log(user);
              // redirect : Admin if user is role is admin
              if (this.loginService.getUserRole() === 'ADMIN') {
                this.loginService.loginStatus.next(true); // sending subject from here.
                this.router.navigate(['admin-dashboard']);
              } else if (this.loginService.getUserRole() === 'NORMAL') {
                this.router.navigate(['dashboard']);
                this.loginService.loginStatus.next(true); // sending subject from here.
              } else {
                this.loginService.logout();
              }

              // redirect : Normal if user is role is normal
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log('error');
          console.log(error);
        }
      );
    }
  }
}
