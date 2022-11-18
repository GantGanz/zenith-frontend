import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule, HomeRouting, CommonModule
    ],
    exports: [
        HomeComponent
    ]
})

export class HomeModule { }