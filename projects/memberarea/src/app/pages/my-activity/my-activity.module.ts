import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyActivityComponent } from "./my-activity.component";
import { MyActivityRouting } from "./my-activity.routing";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";



@NgModule({
    declarations: [
        MyActivityComponent
    ],
    imports: [
        RouterModule, CommonModule, MyActivityRouting,
        TabViewModule,
        ButtonModule
    ],
    exports: [
        MyActivityComponent
    ]
})
export class MyActivityModule { }