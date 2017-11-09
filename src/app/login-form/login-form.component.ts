import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent{
  email: string;
  password: string;
  errorMsg: string;
  constructor(private authService: AuthService, private router: Router) { }

  login(){
    console.log(this.email, this.password);
    let vallue = this.authService.login(this.email, this.password)
    .then(resolve => this.router.navigate(['chat']))
    .catch(error => this.errorMsg = error.message);
    console.log(vallue);
  }

}
