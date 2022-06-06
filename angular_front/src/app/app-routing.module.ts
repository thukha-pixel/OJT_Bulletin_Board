import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UploadCVComponent } from './upload-cv/upload-cv.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserConfirmComponent } from './users/user-confirm/user-confirm.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserUpdateConfirmComponent } from './users/user-update-confirm/user-update-confirm.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
const routes: Routes = [
    {
        path: 'post/create',
        component: PostCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'post/confirm',
        component: PostConfirmComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'posts',
        component: PostListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'post/excel',
        component: UploadCVComponent,
    },
    {
        path: 'user/create',
        component: UserCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/login',
        component: UserLoginComponent,
    },
    {
        path: 'user/update',
        component: UserUpdateComponent,
    },
    {
        path: 'user/confirm',
        component: UserConfirmComponent,
    },
    {
        path: 'user/update/confirm',
        component: UserUpdateConfirmComponent,
    },
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user/profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "user/password",
        component: UserChangePasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        component: PostListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
