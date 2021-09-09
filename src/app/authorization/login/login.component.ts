import { Component, Output } from '@angular/core';
import { Subscription } from 'cypress/types/net-stubbing';
import { EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { UserData } from '../userData';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  subscription!: Subscription;

  @Output() userAuthorized: EventEmitter<boolean> = new EventEmitter<boolean>();
//   isAuthorized: boolean = false;

  userData!: UserData;

  userLogin = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService) {}

  login() {
      this.loginService.loginUser(JSON.stringify(this.userLogin)).subscribe(
        userData => {
            this.userData = userData;
            localStorage.setItem("accessTokenId", userData.accessToken);
            localStorage.setItem("tokenType", userData.tokenType);
            localStorage.setItem("username", userData.username);
            // localStorage.setItem("isAuthorized", "true");
            console.log(this.userData);
            this.userAuthorized.emit(true);
        }
      );
  }

}
