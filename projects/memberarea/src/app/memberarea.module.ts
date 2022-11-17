import { NgModule } from "@angular/core";
import { HomeMemberModule } from "./pages/member-home/home-member.module";

@NgModule({
    imports: [
        HomeMemberModule
    ],
    exports: [
        HomeMemberModule
    ]
})

export class MemberAreaModule { }