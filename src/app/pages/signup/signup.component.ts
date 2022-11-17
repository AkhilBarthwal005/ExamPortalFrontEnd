import { Component, OnInit } from '@angular/core';

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

  constructor() { 
  }

  ngOnInit(): void {
  }

  registrationFormSubmit(){
    console.log(this.user);
  }
  

}
