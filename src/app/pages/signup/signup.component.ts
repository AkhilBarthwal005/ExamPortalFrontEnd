import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  // making object for two way binding view to source and source to view.
  user = {
    userName : "",
    firstName : "",
    lastName : "",
    email:"",
    password:"",
    phone:""
  }

  constructor(private userService : UserService) { 
  }

  ngOnInit(): void {
  }

  registrationFormSubmit(){
    console.log(this.user);
    // Adding user
    this.userService.addUser(this.user).subscribe(

      (data)=>{
        // success
        console.log(data)
        alert("success");
      },
      (error)=>{
        // error
        alert("something went wrong");
      }
    )
  }
  

}
