import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarMemberModule } from "../../components/navbar/navbar-member.module";
import { NotFoundMemberComponent } from "./not-found-member.component";

@NgModule({
    declarations: [
        NotFoundMemberComponent
    ],
    imports: [
        RouterModule, CommonModule, NavbarMemberModule
    ],
    exports: [
        NotFoundMemberComponent
    ]
})
export class NotFoundMemberModule { }