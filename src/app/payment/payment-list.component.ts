import { Component, OnInit } from '@angular/core';
import { IPayment } from './payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  paymentOwner: string = 'testUser';
  displayAddPaymentWindow: boolean = false;
  chosenPaymentIndex: number = 0;
  isMeantToBeModified: boolean = false;
  paymentCandidate:IPayment = {
      paymentTitle: '',
      amountOfOnePayment: 0,
      wholeAmount: 0,
      deadline: ''
  };

  payments: IPayment[] = [
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

  toggleAddPaymentWindow(): void {
    this.paymentCandidate = { 
      paymentTitle: '',
      amountOfOnePayment: 0,
      wholeAmount: 0,
      deadline: ''
    }
    this.isMeantToBeModified = false;
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    console.log(this.displayAddPaymentWindow);
  }

  onPaymentAdded(payment: IPayment): void {
    this.payments.push(payment);
    console.log(payment);
    this.toggleAddPaymentWindow();
  }
  
  onPaymentModified(payment: IPayment, index: number): void{
    this.payments[index]=payment;
    console.log(payment);
    this.toggleAddPaymentWindow();
  }

  onTableRowClicked(index: number): void {
    this.isMeantToBeModified = true;
    this.chosenPaymentIndex = index;
    this.paymentCandidate = this.payments[index];
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    // this.payments.splice(index, 1);
    console.log(this.isMeantToBeModified)
  }

  ngOnInit(): void {}
}
