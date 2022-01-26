import { Injectable, Input } from '@angular/core';
import { IPayment } from './payment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {

httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':  '*',
    'Authorization' : localStorage.getItem("tokenType") + ' ' + localStorage.getItem("accessTokenId")
  })
};
 
  private getUserPaymentsUrl: string =
    'http://localhost:8080/getPayments?userEmail=' + localStorage.getItem("email");
  private addUserPaymentUrl: string =
    'http://localhost:8080/addPayment?userEmail=' + localStorage.getItem("email");
  private modifyUserPaymentUrl: string =
    'http://localhost:8080/modifyPayment?userEmail=' + localStorage.getItem("email") + '&paymentIndex=';
  private deleteUserPaymentUrl: string =
    'http://localhost:8080/deletePayment?userEmail=' + localStorage.getItem("email") + '&paymentIndex=';

  constructor(private http: HttpClient) {
  }

  getPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.getUserPaymentsUrl, this.httpOptions).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addPayment(payment: IPayment): Observable<IPayment> {
    console.log(JSON.stringify(payment));
    return this.http.post<IPayment>(this.addUserPaymentUrl, payment, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  modifyPayment(payment: IPayment, index: number): Observable<IPayment[]> {
    console.log(this.modifyUserPaymentUrl + index);
    return this.http.patch<IPayment[]>(this.modifyUserPaymentUrl + index, payment, this.httpOptions).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePayment(chosenPaymentIndex: number): Observable<IPayment[]> {
    //Console.console.log(this.deleteUserPaymentUrl);
    
    return this.http.delete<IPayment[]>(this.deleteUserPaymentUrl + chosenPaymentIndex, this.httpOptions).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code :${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
