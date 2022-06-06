import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
    userID: any;
    url: any;
    imgUrl: any;
    file: any;
    userDetail: any;
    canChange: any;
    constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

    async getUserDetail() {
        if (this.userID) {
            return await this.userService.getSingleUser(this.userID).subscribe((data: any) => {
                this.userDetail = data;
                this.name?.setValue(this.userDetail.username);
                this.email?.setValue(this.userDetail.email);
                this.type?.setValue(this.userDetail.type == "true" ? 0 : 1);
                this.phone?.setValue(this.userDetail.phone);
                this.dob?.setValue(this.userDetail.dob);
                this.address?.setValue(this.userDetail.address);
                this.url = this.userDetail.profile;

            })
        }
        else {
            this.userDetail = await this.userService.getUser();
            const userData = this.userDetail;
            if (userData?.data.Name || userData?.data.email || userData?.data.password || userData?.data.type || userData?.data.phone || userData?.data.dob || userData?.data.address || userData?.profile) {
                this.name?.setValue(userData.data.Name);
                this.email?.setValue(userData.data.email);
                this.type?.setValue(userData.data.type);
                this.phone?.setValue(userData.data.phone);
                this.dob?.setValue(userData.data.dob);
                this.address?.setValue(userData.data.address);
                if (!userData?.profile) {
                    this.url = userData?.oldProfile;
                } else {
                    this.url = userData?.oldProfile;
                    this.imgUrl = userData?.profile;
                }

            }
            return;
        }
    }

    ngOnInit(): void {
        this.userID = this.route.snapshot.queryParams['userId'];
        this.canChange = this.route.snapshot.queryParams['canChange'];
        this.getUserDetail();
    }

    userForm = this.fb.group({
        Name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        type: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        address: ['']
    });

    get name() {
        return this.userForm?.get('Name');
    }
    get email() {
        return this.userForm?.get('email');
    }
    get type() {
        return this.userForm?.get('type');
    }
    get phone() {
        return this.userForm?.get('phone');
    }

    get dob() {
        return this.userForm?.get('dob');
    }

    get address() {
        return this.userForm?.get('address');
    }

    onSelectFile(e: any) {
        if (e.target.files) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            this.file = e.target.files[0];
            reader.onload = (event: any) => {
                this.imgUrl = event.target.result;
            }
        }
    }

    onConfirm() {
        this.userService.setUser({
            id: this.userID,
            file: this.file,
            oldProfile: this.url,
            profile: this.imgUrl,
            data: this.userForm.value
        })
        this.router.navigate(['user/update/confirm']);
    }

    changePassword() {
        this.router.navigate(["user/password"]);
    }

}
