import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarModule } from "../../component/navbar/navbar.module";
import { NotFoundAdminComponent } from "./not-found-admin/not-found-admin.component";
import { NotFoundSuperAdminComponent } from "./note-found-super-admin/not-found-super-admin.component";

@NgModule({
    declarations: [
        NotFoundAdminComponent, NotFoundSuperAdminComponent
    ],
    imports: [
        RouterModule, CommonModule, NavbarModule
    ],
    exports: [
        NotFoundAdminComponent, NotFoundSuperAdminComponent
    ]
})
export class NotFoundAdminModule { }