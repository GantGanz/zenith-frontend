import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarMemberModule } from "../navbar/navbar-member.module";
import { ContentComponent } from "./content.component";
import { ScrollTopModule } from 'primeng/scrolltop';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule, NavbarMemberModule,
        ScrollTopModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentMemberModule { }