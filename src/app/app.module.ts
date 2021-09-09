import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment/payment-list.component';
import localeDE from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import {PaymentModificationComponent} from './payment/payment-modification.component';
import { ReminderModificationComponent } from './reminder/reminder-modification.component';
import { ReminderListComponent } from './reminder/reminder-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './authorization/login/login.component';

registerLocaleData(localeDE);
@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent,
    ReminderListComponent,
    PaymentModificationComponent,
    ReminderModificationComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pl-PL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
