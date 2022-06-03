import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-user-update-confirm',
	templateUrl: './user-update-confirm.component.html',
	styleUrls: ['./user-update-confirm.component.css']
})
export class UserUpdateConfirmComponent implements OnInit {
	imageUrl: any;
	imageId: any;
	oldImageId: any;
	userDetail: any;
	url: any;
	userID: any;
	constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

	ngOnInit(): void {
		this.userDetail = this.userService.getUser();
		this.userID = this.userDetail.id;
		if (!this.userDetail.profile) {
			this.url = "http://localhost:1337" + this.userDetail.oldProfile
		}
		else {
			this.url = this.userDetail.profile;
		}
	}
	CreateUser() {
		console.log(this.userDetail.profile);
		if (this.userDetail.profile === undefined) {
			this.userService.updateUser(this.userID, {
				username: this.userDetail.data.Name,
				email: this.userDetail.data.email,
				type: this.userDetail.data.type == 0 ? "true" : "false",
				phone: this.userDetail.data.phone,
				address: this.userDetail.data.address,
				dob: this.userDetail.data.dob,
				profile: this.userDetail.oldProfile,
			}).subscribe((data: any) => {
				this.router.navigate(["users"]);
			});
		} else {
			this.userService.getSingleUser(this.userID).subscribe((data: any) => {
				this.userService.deleteImage(data.profile_id).subscribe((data: any) => {
					this.userService.uploadImage(this.userDetail.file).subscribe((data: any) => {
						this.imageUrl = data[0].url;
						this.imageId = data[0].id;
						console.log(this.imageUrl + " " + this.imageId);
						this.userService.updateUser(this.userID, {
							username: this.userDetail.data.Name,
							email: this.userDetail.data.email,
							type: this.userDetail.data.type == 0 ? "true" : "false",
							phone: this.userDetail.data.phone,
							address: this.userDetail.data.address,
							dob: this.userDetail.data.dob,
							profile: this.imageUrl,
							profile_id: this.imageId
						}).subscribe((data: any) => {
							this.router.navigate(["users"]);
						})
					})
				})
			})
			
		}
	}

	ClearConfirm(){
		this.router.navigate(["user/update"])
	}

}
