import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment/payment-list.component';
import localeDE from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDE);
@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pl-PL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
