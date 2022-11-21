import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CourseComponent } from "./course.component";
import { CourseRouting } from "./course.routing";
import { CardModule } from 'primeng/card';
import { ButtonModule } from "primeng/button";


@NgModule({
    declarations: [
        CourseComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        CourseRouting,
        CardModule,
        ButtonModule
    ],
    exports: [
        CourseComponent
    ]
})

export class CourseModule { }