import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // making object for two way binding view to source and source to view.
  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrationFormSubmit() {
    console.log(this.user);
    // Adding user
    this.userService.addUser(this.user).subscribe(
      (data) => {
        // success
        console.log(data);
        // alert('success');
        Swal.fire(
          'Successfully Register!',
          'Your Registration has been done!',
          'success'
        );
        this.router.navigate(['login']);
      },
      (error) => {
        // error
        // alert("something went wrong");
        this.snackBar.open('something went wrong', '', {
          duration: 2000,
        });
      }
    );
  }
}
