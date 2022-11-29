import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyActivityComponent } from "./my-activity.component";
import { MyActivityRouting } from "./my-activity.routing";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload'
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
    declarations: [
        MyActivityComponent
    ],
    imports: [
        RouterModule, CommonModule, MyActivityRouting,
        TabViewModule,
        ButtonModule,
        DropdownModule,
        CalendarModule,
        FileUploadModule,
        InputNumberModule
    ],
    exports: [
        MyActivityComponent
    ]
})
export class MyActivityModule { }