import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileDetailComponent } from "./detail-profile/profile-detail.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";



const routes: Routes = [
    {
        path: "",
        component: ProfileViewComponent,
    },
    {
        path: "edit/:id",
        component: EditProfileComponent
    },
    {
        path: "change-password",
        component: ChangePasswordComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRouting { }