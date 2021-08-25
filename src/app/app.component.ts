import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html'
})
export class AppComponent {
  title: string = 'Chaos Organizer';
  displayPaymentsIndicatior: boolean = true;
  displayReminders(): void{
    this.displayPaymentsIndicatior = false;
  }

  displayPayments(): void{
    this.displayPaymentsIndicatior = true;
  }
}
