import { Component, Output } from '@angular/core';
import { Subscription } from 'cypress/types/net-stubbing';
import { EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { UserData } from '../userData';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  subscription!: Subscription;

  @Output() userAuthorized: EventEmitter<boolean> = new EventEmitter<boolean>();
//   isAuthorized: boolean = false;

@Output() userRegistered: EventEmitter<boolean> = new EventEmitter<boolean>();

  userData!: UserData;
  displayLogin: boolean = true;
  headerText:string = 'Dont have an account? Sign up!';
  buttonText:string = 'Sign up';
  userLogin = {
    email: '',
    password: '',
  };

  userRegister = {
    firstName: '',
    surname:'',
    password: '',
    email: ''
  }

  userGoogleLogin = {
    token: ''
  }

  constructor(private loginService: LoginService, private socialAuthService: SocialAuthService) {}

  login() {
      this.loginService.loginUser(JSON.stringify(this.userLogin)).subscribe(
        userData => {
            this.userData = userData;
            localStorage.setItem("accessTokenId", userData.accessToken);
            localStorage.setItem("tokenType", userData.tokenType);
            localStorage.setItem("email", userData.email);
            // localStorage.setItem("isAuthorized", "true");
            console.log(this.userData);
            this.userAuthorized.emit(true);
          }
        );
    }
  
    register(){
      this.loginService.registerUser(JSON.stringify(this.userRegister)).subscribe(
        response=> {
          console.log(response);
          this.userRegistered.emit(true);
          this.displayLogin = true;
        }
      )
    }
  
    displayRegistrationForm(){
      this.displayLogin = !this.displayLogin;
    if(this.displayLogin === true)
    {
      this.buttonText = 'Sign up';
      this.headerText = 'Dont have an account? Sign up!';
    }
    else
    {
      this.buttonText = 'Sign in';
      this.headerText = 'Already have an account? Sign in!';
    }
  }

  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

  
  loginWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions ).then((data) => {
      console.log(data.authToken);
      this.userGoogleLogin.token = data.idToken;
      this.loginService.loginUserWithGoogle(JSON.stringify(this.userGoogleLogin)).subscribe(
        respone => { console.log(respone)}
      )
    }).catch(data => {
      this.socialAuthService.signOut();
    })
  }
}
