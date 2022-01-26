import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment/payment-list.component';
import localeDE from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { PaymentModificationComponent } from './payment/payment-modification.component';
import { ReminderModificationComponent } from './reminder/reminder-modification.component';
import { ReminderListComponent } from './reminder/reminder-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './authorization/login/login.component';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

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
  imports: [FormsModule, BrowserModule, HttpClientModule, SocialLoginModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl-PL',
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '793747488111-943133kp44h9mc003p756tseh163be3m.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
