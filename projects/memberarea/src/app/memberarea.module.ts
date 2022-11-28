import { NgModule } from "@angular/core";
import { HomeModule } from "./pages/home/home.module";

@NgModule({
    imports: [
        HomeModule, HomeModule
    ],
    exports: [
        HomeModule, HomeModule
    ]
})

export class MemberAreaModule { }