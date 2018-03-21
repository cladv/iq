import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() {}
 
  loginGoogle() {
    this.authService.googleLogin()
    ;
  }
  loginFb() {
  }
}

/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  username : string
  password : string
  
  login() : void {
    
    if(this.username == 'admin' && this.password == 'admin'){
      alert("Welcome!");
      this.router.navigate(["home"]);
     
    }else {
      alert("Invalid credentials");
    }
  }
}
 */