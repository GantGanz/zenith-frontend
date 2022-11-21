import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { NavbarAdminComponent } from "./navbar-admin/navbar-admin.component";
import { NavbarSuperAdminComponent } from "./navbar-super-admin/navbar-super-admin.component";

@NgModule({
    declarations: [
        NavbarAdminComponent, NavbarSuperAdminComponent, FooterComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        NavbarAdminComponent, NavbarSuperAdminComponent, FooterComponent
    ]
})
export class NavbarModule { }