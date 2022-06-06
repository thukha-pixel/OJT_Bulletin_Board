import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userId: any;
	userDetail: any;
	constructor(private userService: UserService, private router: Router) { }

	ngOnInit(): void {
		this.userId = localStorage.getItem("userId");
		this.userService.getSingleUser(this.userId).subscribe((data: any) => {
			this.userDetail = data;
		})
	}

	hashPassword(password: string) {
		return "*".repeat(password.length)
	}

	onUpdate(id: any) {
		this.router.navigate(['user/update'], { queryParams: { userId: id, canChange: true } });
	}
}
