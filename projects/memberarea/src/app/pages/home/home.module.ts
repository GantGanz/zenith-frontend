import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule,
        HomeRouting,
        CommonModule,
        ButtonModule,
        InputTextModule
    ],
    exports: [
        HomeComponent
    ]
})

export class HomeModule { }