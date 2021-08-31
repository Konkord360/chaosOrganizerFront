import { Component, OnInit } from '@angular/core';
import { IPayment } from './reminder';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css'],
})
export class ReminderListComponent implements OnInit {
  reminderOwner: string = 'testUser';
  displayAddPaymentWindow: boolean = false;
  chosenPaymentIndex: number = 400;
  isMeantToBeModified: boolean = false;
  paymentCandidate: IPayment = {
    paymentTitle: '',
    amountOfOnePayment: 0,
    wholeAmount: 0,
    deadline: '',
  };

  payments: IPayment[] = [
    // {
    //   paymentTitle: 'czynsz',
    //   amountOfOnePayment: 200,
    //   wholeAmount: 0,
    //   deadline: '23.08.2021',
    // },
    // {
    //   paymentTitle: 'kredyt za dom',
    //   amountOfOnePayment: 300,
    //   wholeAmount: 200000,
    //   deadline: '23.12.2021',
    // },
  ];

  toggleAddPaymentWindow(): void {
    this.paymentCandidate = {
      paymentTitle: '',
      amountOfOnePayment: 0,
      wholeAmount: 0,
      deadline: '',
    };
    this.isMeantToBeModified = false;
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    // console.log(this.displayAddPaymentWindow);
  }

  onPaymentAdded(payment: IPayment): void {
    this.payments.push(payment);
    console.log(payment);
    this.toggleAddPaymentWindow();
  }

  onPaymentModified(payment: IPayment, index: number): void {
    this.payments[index] = payment;
    console.log(payment);
    this.toggleAddPaymentWindow();
  }

  onTableRowClicked(index: number): void {
      this.isMeantToBeModified = true;
      this.chosenPaymentIndex = index;
      this.paymentCandidate.amountOfOnePayment =
        this.payments[index].amountOfOnePayment;
      this.paymentCandidate.deadline = this.payments[index].deadline;
      this.paymentCandidate.paymentTitle = this.payments[index].paymentTitle;
      this.paymentCandidate.wholeAmount = this.payments[index].wholeAmount;
      this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
  }

  onActionCanceled() {
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    this.chosenPaymentIndex = 400;
  }

  onPaymentDeleted(payment: IPayment, index: number) {
    if (index > -1) {
      this.payments.splice(index, 1);
    }
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
  }

  ngOnInit(): void {}
}
