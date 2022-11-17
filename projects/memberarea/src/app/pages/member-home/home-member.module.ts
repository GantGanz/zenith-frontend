import { NgModule } from "@angular/core";
import { HomeMemberComponent } from "./home-member.component";
import { HomeMemberRouting } from "./home-member.routing";


@NgModule({
    declarations: [
        HomeMemberComponent
    ],
    imports: [
        HomeMemberRouting
    ],
    exports: [
        HomeMemberComponent
    ]
})


export class HomeMemberModule { }