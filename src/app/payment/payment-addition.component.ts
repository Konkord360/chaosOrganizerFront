import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { IPayment } from './payment';

@Component({
  selector: 'payment-addition',
  templateUrl: './payment-addition.component.html',
  styleUrls: ['./payment-addition.component.css'],
})
export class PaymentAdditionComponent {
  @Input() isInModificationMode: boolean = false;
  @Input() newPayment: IPayment = {
    paymentTitle: '',
    amountOfOnePayment: 0,
    wholeAmount: 0,
    deadline: '',
  };
  @Output() addPayment: EventEmitter<IPayment> = new EventEmitter<IPayment>();
  @Output() paymentModified: EventEmitter<IPayment> = new EventEmitter<IPayment>();

  letsDoThis() {
    this.addPayment.emit(this.newPayment);
  }

  addNewPayment(){
    this.addPayment.emit(this.newPayment);
  }

  modifyPayment(){
     this.paymentModified.emit(this.newPayment); 
  }

  onDelete(){
      //todo implement deletition
  }
}
