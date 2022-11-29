import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyActivityComponent } from "./my-activity.component";
import { MyActivityRouting } from "./my-activity.routing";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { InfiniteScrollModule } from "ngx-infinite-scroll";



@NgModule({
    declarations: [
        MyActivityComponent
    ],
    imports: [
        RouterModule, CommonModule, MyActivityRouting,
        TabViewModule,
        ButtonModule,
        ImageModule,
        InfiniteScrollModule
    ],
    exports: [
        MyActivityComponent
    ]
})
export class MyActivityModule { }