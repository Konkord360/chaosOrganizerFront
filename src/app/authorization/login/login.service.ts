import { Injectable, Input } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, observeOn, tap } from 'rxjs/operators';
import { UserData} from '../userData';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private loginUserUrl: string =
    'http://localhost:8080/api/auth/signin';

    loginUser(userLogin : string) :Observable<UserData>
    {
        console.log(userLogin);
        return this.http.post<UserData>(this.loginUserUrl, userLogin, this.httpOptions).pipe(
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
