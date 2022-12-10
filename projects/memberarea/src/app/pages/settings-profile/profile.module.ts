import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { MenuProfileComponent } from "./edit-profile-menu/menu-profile.component";
import { ProfileRouting } from "./profile.routing";
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext"
import { PasswordModule } from "primeng/password"
import { DropdownModule } from "primeng/dropdown"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { ProfileViewComponent } from "./profile-view/profile-view.component";
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StyleClassModule } from 'primeng/styleclass';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { TimeModule } from "projects/mainarea/src/app/pipe/time-ago.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AutoFocusModule } from 'primeng/autofocus';


@NgModule({
    declarations: [
        MenuProfileComponent, EditProfileComponent, ChangePasswordComponent, ProfileViewComponent
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
        TabViewModule,
        InputTextareaModule,
        StyleClassModule,
        DialogModule,
        ConfirmDialogModule,
        GalleriaModule,
        ImageModule,
        TimeModule,
        InfiniteScrollModule,
        AutoFocusModule
    ],
    exports: [
        MenuProfileComponent, EditProfileComponent, ChangePasswordComponent,
        ProfileViewComponent
    ]
})
export class ProfileModule { }