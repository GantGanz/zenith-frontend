import { Component, NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminContentComponent } from "../../component/content/admin/admin.content.component"
import { SuperAdminContentComponent } from "../../component/content/super admin/super-admin.content.component"
import { ChangePasswordComponent } from "./change-password/change-password.component"
import { EditProfileComponent } from "./edit-profile/edit-profile.component"
import { ProfileViewComponent } from "./view-profile/profile-view.component"


const routes: Routes = [

    {
        path: "super-admin/profiles",
        component: SuperAdminContentComponent,
        children: [
            {
                path: "view",
                component: ProfileViewComponent,
            },
            {
                path: "change-password",
                component: ChangePasswordComponent,
            },
            {
                path: "edit",
                component: EditProfileComponent
            }
        ]
    },

    {
        path: "admin/profiles",
        component: AdminContentComponent,
        children: [
            {
                path: "view",
                component: ProfileViewComponent,
            },
            {
                path: "change-password",
                component: ChangePasswordComponent,
            },
            {
                path: "edit",
                component: EditProfileComponent
            }
        ]
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