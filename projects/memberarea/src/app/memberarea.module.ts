import { NgModule } from "@angular/core";
import { HomeModule } from "./pages/home/home.module";

@NgModule({
    imports: [
        HomeModule
    ],
    exports: [
        HomeModule
    ]
})

export class MemberAreaModule { }