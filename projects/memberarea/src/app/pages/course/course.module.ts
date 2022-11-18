import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CourseComponent } from "./course.component";
import { CourseRouting } from "./course.routing";


@NgModule({
    declarations: [
        CourseComponent
    ],
    imports: [
        RouterModule, CommonModule, CourseRouting
    ],
    exports: [
        CourseComponent
    ]
})

export class CourseModule { }