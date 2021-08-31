import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { IPayment } from './payment';

@Component({
  selector: 'payment-modification',
  templateUrl: './payment-modification.component.html',
  styleUrls: ['./payment-modification.component.css'],
})
export class PaymentModificationComponent {
  @Input() isInModificationMode: boolean = false;
  @Input() newPayment: IPayment = {
    paymentTitle: '',
    amountOfSinglePayment: 0,
    wholeAmount: 0,
    deadline: '',
    receiverIBAN: '',
    receiverName: '',
    senderIBAN: '',
    payedByNow: 0,
  };
  @Output() addPayment: EventEmitter<IPayment> = new EventEmitter<IPayment>();
  @Output() paymentModified: EventEmitter<IPayment> =
    new EventEmitter<IPayment>();
  @Output() actionCanceled: EventEmitter<void> = new EventEmitter<void>();
  @Output() paymentDeleted: EventEmitter<IPayment> =
    new EventEmitter<IPayment>();
  letsDoThis() {
    this.addPayment.emit(this.newPayment);
  }

  addNewPayment() {
    this.addPayment.emit(this.newPayment);
  }

  modifyPayment() {
    this.paymentModified.emit(this.newPayment);
  }

  onDelete() {
    this.paymentDeleted.emit(this.newPayment);
  }

  onCancel() {
    this.actionCanceled.emit();
  }
}
