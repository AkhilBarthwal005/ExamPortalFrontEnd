import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username = null;

  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.loginService.isLoggedIn();
    // this.username = this.loginService.getUser().username;
    this.loginService.loginStatus.asObservable().subscribe((data) => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.username = this.loginService.getUser()
        ? this.loginService.getUser().username
        : this.loginService.getUser();
      console.log(this.isLoggedIn);
    });
  }

  logout() {
    this.loginService.logout();
  }
}
