import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EventComponent } from "./event.component";
import { EventRouting } from "./event.routing";


@NgModule({
    declarations: [
        EventComponent
    ],
    imports: [
        RouterModule, CommonModule, EventRouting
    ],
    exports: [
        EventComponent
    ]
})

export class EventModule { }