import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { PostUpdateComponent } from "./post-update/post-update.component";
import { ProfileViewComponent } from "./profile-view/profile-view.component";



const routes: Routes = [
    {
        path: "",
        component: ProfileViewComponent,
    },
    {
        path: "edit",
        component: EditProfileComponent
    },
    {
        path: "change-password",
        component: ChangePasswordComponent
    },
    {
        path: "edit-post/:id",
        component: PostUpdateComponent
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