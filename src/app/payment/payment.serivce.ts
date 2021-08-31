import { Injectable } from '@angular/core';
import { IPayment } from './payment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private serviceUrl: string = 'http://localhost:8080/getPayments?userLogin=freaky';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<IPayment[]> {
      return this.http.get<IPayment[]>(this.serviceUrl).pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse){
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occured: ${err.error.message}`;
      }else {
          errorMessage = `Server returned code :${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
  }
}
