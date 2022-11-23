import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarModule } from "../navbar/navbar.module";
import { AdminContentComponent } from "./admin/admin.content.component";
import { SuperAdminContentComponent } from "./super admin/super-admin.content.component";

@NgModule({
    declarations: [
        AdminContentComponent, SuperAdminContentComponent
    ],
    imports: [
        RouterModule, NavbarModule
    ],
    exports: [
        AdminContentComponent, SuperAdminContentComponent
    ]
})

export class ContentAdminModule { }