import { NgModule } from "@angular/core";
import { DashboardAdminComponent } from "./admin/dashboard-admin.component";
import { DashboardRouting } from "./dashboard.routing";
import { DashboardSuperAdminComponent } from "./super-admin/dashboard-super-admin.component";

@NgModule({
    declarations: [
        DashboardAdminComponent, DashboardSuperAdminComponent
    ],
    imports: [
        DashboardRouting
    ],
    exports: [
        DashboardAdminComponent, DashboardSuperAdminComponent
    ]
})
export class DashboardModule { }