import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = 'Chaos Organizer';
  displayPaymentsIndicatior: boolean = true;
  isUserLoggedIn: boolean = localStorage.getItem("isAuthorized") == "true";

  displayReminders(): void {
    this.displayPaymentsIndicatior = false;
  }

  displayPayments(): void {
    this.displayPaymentsIndicatior = true;
  }

  login(isAuthorized: boolean) {
    // alert(isAuthorized);
    localStorage.setItem("isAuthorized", "true");
    this.isUserLoggedIn = localStorage["isAuthorized"];
  }

  register(isRegister: boolean){
    // if(isRegister)
      // this.userSuccessfullyRegister = true;
  }

  logout(){
    console.log("trying to log out")
    localStorage.setItem("isAuthorized", "false");
    localStorage.setItem("accessTokenId", "");
    localStorage.setItem("tokenType", "");
    localStorage.setItem("username", "");
    this.isUserLoggedIn = false; 
  }
  
  ngOnInit(): void {
    this.isUserLoggedIn = localStorage.getItem("isAuthorized") == "true";
  }
}
