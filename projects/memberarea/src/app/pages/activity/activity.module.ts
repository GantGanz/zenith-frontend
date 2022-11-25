import { NgModule } from "@angular/core";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ActivityRouting } from "./activity.routing";
import { ButtonModule } from "primeng/button";


@NgModule({
    declarations: [
        ActivityListComponent
    ],
    imports: [
        RouterModule, CommonModule, ActivityRouting,
        TabViewModule,
        ButtonModule
    ],
    exports: [
        ActivityListComponent
    ]
})
export class ActivityModule { }