import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Post } from 'src/models/post';
import { retry, catchError } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	userId: any;
	userName: any;

	ngOnInit(): void {

	}

	constructor(private router: Router) {
		// question 01
		this.router.events.subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.userId = localStorage.getItem("userId");
				this.userName = localStorage.getItem("userName");
			}
		});
	}

	onLogout() {
		localStorage.clear();
		this.router.navigate(['user/login']);
	}
}


