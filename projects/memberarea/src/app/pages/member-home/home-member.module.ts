import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeMemberComponent } from "./home-member.component";
import { HomeMemberRouting } from "./home-member.routing";


@NgModule({
    declarations: [
        HomeMemberComponent
    ],
    imports: [
        RouterModule, HomeMemberRouting, CommonModule
    ],
    exports: [
        HomeMemberComponent
    ]
})

export class HomeMemberModule { }