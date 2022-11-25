import { NgModule } from "@angular/core";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ActivityRouting } from "./activity.routing";


@NgModule({
    declarations: [
        ActivityListComponent
    ],
    imports: [
        RouterModule, CommonModule, ActivityRouting,
        TabViewModule
    ],
    exports: [
        ActivityListComponent
    ]
})
export class ActivityModule { }