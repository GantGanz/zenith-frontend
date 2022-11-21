import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarMemberModule } from "../navbar/navbar-member.module";
import { ContentComponent } from "./content.component";

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule, NavbarMemberModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentMemberModule { }