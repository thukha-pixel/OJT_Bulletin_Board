import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    hide = true;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
    }
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        password: ['', Validators.required]
    });

    get email() {
        return this.loginForm?.get('email');
    }
    get password() {
        return this.loginForm?.get('password');
    }

    async onSubmit() {
        await this.authService.loginUser({
            identifier: this.email?.value,
            password: this.password?.value
        }).subscribe((data: any) => {

            localStorage.setItem('token', data.jwt);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('userName', data.user.username);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("type", data.user.type);

            this.router.navigate(['posts']);
        })
    }
}
