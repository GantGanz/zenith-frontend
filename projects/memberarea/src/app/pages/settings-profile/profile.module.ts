import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { MenuProfileComponent } from "./menu/menu-profile.component";
import { ProfileRouting } from "./profile.routing";
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { ProfileDetailComponent } from "./detail-profile/profile-detail.component";


import { CardModule } from "primeng/card";

@NgModule({
    declarations: [
        MenuProfileComponent, EditProfileComponent, ChangePasswordComponent, ProfileDetailComponent
    ],
    imports: [
        RouterModule, CommonModule, ProfileRouting,
        DividerModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
        FileUploadModule,
        HttpClientModule,


        CardModule

    ],
    exports: [
        MenuProfileComponent, EditProfileComponent, ChangePasswordComponent, ProfileDetailComponent
    ]
})
export class ProfileModule { }