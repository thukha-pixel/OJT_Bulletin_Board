import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs';
import { User } from 'src/models/user';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	userDetail: any;
	apiURL = 'http://localhost:1338/api/auth/local';

	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}),
	};

	constructor(private http: HttpClient) { }

	//set User
	setUser(data: any) {
		this.userDetail = data;
	}

	//get User
	getUser() {
		return this.userDetail;
	}

	//get all users
	getAllUsers(): Observable<User> {
		return this.http
			.get<User>('http://localhost:1338/api/users', this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

	getSingleUser(id: any): Observable<User> {
		return this.http
			.get<User>('http://localhost:1338/api/users/' + id, this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

	//get users by date range
	getUserByDate(From: any, To: any): Observable<User> {
		return this.http
			.get<User>('http://localhost:1338/api/users?filters[createdAt][$gt]=' + From + '&filters[createdAt][$lt]=' + To)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API post() method => Create user
	createUser(user: any): Observable<any> {
		return this.http
			.post<any>(
				this.apiURL + '/register',
				JSON.stringify(user),
				this.httpOptions
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API put() method => Update user
	updateUser(id: any, user: any): Observable<User> {
		return this.http
			.put<User>('http://localhost:1338/api/users/' + id,
				JSON.stringify(user),
				this.httpOptions
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API delete() method => Delete user
	deleteUser(id: any) {
		return this.http
			.delete<User>('http://localhost:1338/api/users/' + id, this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

	// Error handling
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

	//upload Image
	uploadImage(file: any): Observable<void> {
		const formData = new FormData();
		formData.append('files', file);
		return this.http
			.post<any>(
				'http://localhost:1338/api/upload',
				formData,
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API delete() method => Delete image
	deleteImage(id: any) {

		return this.http
			.delete('http://localhost:1338/api/upload/files/' + id, this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

}
