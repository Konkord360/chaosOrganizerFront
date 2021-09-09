import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPayment } from './payment';
import { PaymentService } from './payment.serivce';

@Component({
  selector: 'app-payments',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  providers: [PaymentService],
})
export class PaymentListComponent implements OnInit {
 subscription!: Subscription;

  errorMessage: string = '';
  paymentOwner: string = 'testUser';
  displayAddPaymentWindow: boolean = false;
  chosenPaymentIndex: number = 400;
  isMeantToBeModified: boolean = false;
  paymentCandidate: IPayment = {
    paymentTitle: '',
    amountOfSinglePayment: 0,
    wholeAmount: 0,
    deadline: '',
    receiverIBAN: '',
    receiverName: '',
    senderIBAN: '',
    payedByNow: 0,
  };

  payments: IPayment[] = [];

  toggleAddPaymentWindow(): void {
    this.paymentCandidate = {
      paymentTitle: '',
      amountOfSinglePayment: 0,
      wholeAmount: 0,
      deadline: '',
      receiverIBAN: '',
      receiverName: '',
      senderIBAN: '',
      payedByNow: 0,
    };
    this.isMeantToBeModified = false;
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
  }

  onPaymentAdded(payment: IPayment): void {
    // this.payments.push(payment);
    this.paymentService.addPayment(payment).subscribe
    (
      payment => {
        if (!this.payments === null)
          this.payments.push(payment)
        else
          this.payments = Array.of(payment);
      }
    );
    console.log(payment);
    this.toggleAddPaymentWindow();
  }

  onPaymentModified(payment: IPayment, index: number): void {
    this.paymentService.modifyPayment(payment, index).subscribe(
      payments => this.payments = payments
    );
    this.toggleAddPaymentWindow();
  }

  onTableRowClicked(index: number): void {
    this.isMeantToBeModified = true;
    this.chosenPaymentIndex = index;
    Object.assign(this.paymentCandidate, this.payments[index]);
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
  }

  onActionCanceled() {
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
    this.chosenPaymentIndex = 400;
  }

  onPaymentDeleted(index: number) {
    this.paymentService.deletePayment(index).subscribe(
      payments => this.payments = payments
    );
    // if (index > -1) {
    //   this.payments.splice(index, 1);
    // }
    
    this.displayAddPaymentWindow = !this.displayAddPaymentWindow;
  }

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.subscription = this.paymentService.getPayments().subscribe({
      next: payments => this.payments = payments,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
