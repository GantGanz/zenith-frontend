import { NgModule } from "@angular/core";
import { HomeModule } from "./pages/home/home.module";
import { NotFoundMemberModule } from "./pages/not-found/not-found.module";

@NgModule({
    imports: [
        HomeModule, NotFoundMemberModule
    ],
    exports: [
        HomeModule, NotFoundMemberModule
    ]
})

export class MemberAreaModule { }