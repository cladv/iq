import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {
  email;
  password;
  hide = true;
  showSpinner: boolean = false;
  constructor(private authService: AuthService) { }
 
  ngOnInit() {}
 
  onSubmit(formData) {
    if (formData.valid) {
      this.showSpinner = true;
      console.log(formData.value);
      this.authService.login(
        formData.value.email,
        formData.value.password
      );
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);
    }
  }

}
