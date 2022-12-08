import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  user: any;

  public getUserDetails() {
    this.loginService.getCurrentUserDetails().subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
