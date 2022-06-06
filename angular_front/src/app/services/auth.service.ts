import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    apiURL = 'http://localhost:1338/api';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    loginUser(user: any): Observable<any> {
        return this.http
            .post<any>(
                this.apiURL + '/auth/local',
                JSON.stringify(user),
                this.httpOptions
            )
            .pipe(retry(1), catchError(this.handleError));
    }

    //Checking Loggin
    loggedIn() {
        return !!localStorage.getItem("token");  // question (!!) 
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }

    changePassword(data: any): Observable<any> {
        return this.http
            .patch<any>(
                this.apiURL + '/password',
                JSON.stringify(data),
                this.httpOptions
            )
    }
}
