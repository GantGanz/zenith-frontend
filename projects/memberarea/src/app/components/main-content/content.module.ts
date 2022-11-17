import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarMemberModule } from "../navbar/navbar-member.module";
import { MainContentComponent } from "./content.component";

@NgModule({
    declarations: [
        MainContentComponent
    ],
    imports: [
        RouterModule, NavbarMemberModule
    ],
    exports: [
        MainContentComponent
    ]
})
export class MainContentModule { }