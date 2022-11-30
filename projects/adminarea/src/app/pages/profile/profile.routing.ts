import { Component, NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard"
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard"
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
                path: "change-password/:id",
                component: ChangePasswordComponent,
            },
            {
                path: "edit/:id",
                component: EditProfileComponent
            }
        ],
        canActivate:[
            SuperAdminGuard
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
                path: "change-password/:id",
                component: ChangePasswordComponent,
            },
            {
                path: "edit/:id",
                component: EditProfileComponent
            }
        ],
        canActivate:[
            AdminGuard
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