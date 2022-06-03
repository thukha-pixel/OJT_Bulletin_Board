import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialExampleModule } from 'material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { FormsModule } from '@angular/forms';
import { UploadCVComponent } from './upload-cv/upload-cv.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserConfirmComponent } from './users/user-confirm/user-confirm.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserUpdateConfirmComponent } from './users/user-update-confirm/user-update-confirm.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
@NgModule({
	declarations: [
		AppComponent,
		PostCreateComponent,
		PostConfirmComponent,
		PostListComponent,
		UploadCVComponent,
		UserCreateComponent,
		UserConfirmComponent,
		UsersListComponent,
		UserUpdateComponent,
		UserUpdateConfirmComponent,
		UserLoginComponent,
  UserProfileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialExampleModule,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,

	],
	providers: [
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
