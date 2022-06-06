import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
    selector: 'app-user-change-password',
    templateUrl: './user-change-password.component.html',
    styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

    hide = true;
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
    }

    updatePasswordForm = this.fb.group({
        oldPassword: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[!@#&()\-/$=<>?])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#&()\-/$=<>?]+$'),
        Validators.minLength(5), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required],
    }, {
        validators: this.MustMatch('password', 'confirmPassword'),
    });

    get oldPassword() {
        return this.updatePasswordForm?.get('oldPassword');
    }

    get password() {
        return this.updatePasswordForm?.get('password');
    }

    get confirmPassword() {
        return this.updatePasswordForm?.get('confirmPassword');
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors?.['MustMatch']) {
                return
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ MustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    onConfirm() {
        console.log(localStorage.getItem("email"));

        this.authService.changePassword(
            {
                identifier: localStorage.getItem("email"),
                current_password: this.oldPassword?.value,
                new_password: this.password?.value,
                confirm_password: this.confirmPassword?.value
            }
        ).subscribe(
            (data: any) => {
                alert("Password is changed successfully!");
                localStorage.clear();
            }, (error) => {
                alert("Invalid Old Password");
            }
        );
    }
}
