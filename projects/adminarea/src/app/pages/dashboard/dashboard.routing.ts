import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
// import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { AdminContentComponent } from "../../component/content/admin/admin.content.component";
import { SuperAdminContentComponent } from "../../component/content/super admin/super-admin.content.component";
import { DashboardAdminComponent } from "./admin/dashboard-admin.component";
import { DashboardSuperAdminComponent } from "./super-admin/dashboard-super-admin.component";

const routes: Routes = [
    {
        path: "admin",
        component: AdminContentComponent,
        children: [
            {
                path: "",
                component: DashboardAdminComponent
            }
        ],
        // canActivate:[
        //     AdminGuard
        // ]
        
    },
    {
        path: "super-admin",
        component: SuperAdminContentComponent,
        children: [
            {
                path: "",
                component: DashboardSuperAdminComponent
            }
        ],
        canActivate:[
            // SuperAdminGuard
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
export class DashboardRouting { }