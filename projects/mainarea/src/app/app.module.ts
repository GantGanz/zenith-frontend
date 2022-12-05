import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DropdownModule } from 'primeng/dropdown';
import { AppRouting } from './app.routing';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FilterTokenInterceptor } from './filter/filter-token.interceptor';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService } from 'primeng/api';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, SignUpComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRouting,
    CardModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    ImageModule,
    FileUploadModule,
    HttpClientModule,
    StepsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    PasswordModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FilterTokenInterceptor, multi: true },
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
