import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent {
  paymentName: String = 'test';
  paymentList: String = 'payment list';
  paymentAmount: any = 1000;
  whole: any = 1000;
  deadline: String = '20.12.2021';
  payments: any[] = [
    {
      paymentTitle: 'czynsz',
      amountOfOnePayment: 200,
      wholeAmount: 0,
      deadline: '23.08.2021',
    },
    {
      paymentTitle: 'kredyt za dom',
      amountOfOnePayment: 300,
      wholeAmount: 200000,
      deadline: '23.12.2021',
    },
  ];
  displayAddPaymentWindow: boolean = false;

  toggleAddPaymentWindow(): void {
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    console.log(this.displayAddPaymentWindow);
  }

  letsDoThis(): void {
    this.payments.push({
      paymentTitle: this.paymentName,
      amountOfOnePayment: this.paymentAmount,
      wholeAmount: this.whole,
      deadline: this.deadline,
    });
    console.log(this.payments);
    this.toggleAddPaymentWindow();
  }
}
