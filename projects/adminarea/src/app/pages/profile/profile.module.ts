import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { ProfileViewComponent } from "./view-profile/profile-view.component"
import { ProfileRouting } from "./profile.routing"
import { ChangePasswordComponent } from "./change-password/change-password.component"
import { EditProfileComponent } from "./edit-profile/edit-profile.component"
import { CardModule } from "primeng/card"
import { ButtonModule } from "primeng/button"
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from "@angular/common"



@NgModule({
    declarations: [
        ProfileViewComponent, ChangePasswordComponent, EditProfileComponent
    ],
    imports: [
        RouterModule,
        ProfileRouting,
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        HttpClientModule,
        CommonModule
    ],
    exports: [
        ProfileViewComponent, ChangePasswordComponent, EditProfileComponent
    ]
})

export class ProfileModule { }