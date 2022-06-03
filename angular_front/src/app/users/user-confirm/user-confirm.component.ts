import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
	selector: 'app-user-confirm',
	templateUrl: './user-confirm.component.html',
	styleUrls: ['./user-confirm.component.css']
})
export class UserConfirmComponent implements OnInit {
	imageUrl: any;
	imageId: any;
	userDetail: any;

	constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

	ngOnInit(): void {
		this.userDetail = this.userService.getUser();
	}

	hashPassword(password: string) {
		return "*".repeat(password?.length)
	}

	cancelConfirm() {
		this.router.navigate(["user/create"]);
	}

	async createConfirm() {

		await this.userService.uploadImage(this.userDetail.file).subscribe((data: any) => {
			this.imageUrl = data[0].url;
			this.imageId = data[0].id;
			console.log(this.imageId);
			this.userService.createUser(
				{
					username: this.userDetail.data.Name,
					email: this.userDetail.data.email,
					password: this.userDetail.data.password,
					type: this.userDetail.data.type == 0 ? "true" : "false",
					phone: this.userDetail.data.phone,
					address: this.userDetail.data.address,
					dob: this.userDetail.data.dob,
					profile: this.imageUrl,
					profile_id: this.imageId
				}).subscribe((data: any) => {
					console.log(data);
				});
		});

	}

}


