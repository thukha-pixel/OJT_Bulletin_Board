import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Post } from 'src/models/post';
import { retry, catchError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {
	postDetail: any;


	//set Post
	setPost(data: any) {
		this.postDetail = data;
	}

	//get Post
	getPost() {
		return this.postDetail;
	}
	apiURL = 'http://localhost:1338/api';
	// Http Options
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}),
	};


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

	getAllPosts(): Observable<Post> {
		return this.http
			.get<Post>(this.apiURL + '/posts', this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

	getSinglePost(id: any): Observable<Post> {
		return this.http
			.get<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API post() method => Create post
	createPost(post: any): Observable<Post> {
		return this.http
			.post<any>(
				this.apiURL + '/posts',
				JSON.stringify(post),
				this.httpOptions
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API put() method => Update post
	updatePost(id: any, post: any): Observable<Post> {
		return this.http
			.put<Post>(
				this.apiURL + '/posts/' + id,
				JSON.stringify(post),
				this.httpOptions
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	// HttpClient API delete() method => Delete employee
	deletePost(id: any) {
		return this.http
			.delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
			.pipe(retry(1), catchError(this.handleError));
	}


	constructor(private http: HttpClient) { }
}
