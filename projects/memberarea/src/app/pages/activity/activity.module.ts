import { NgModule } from "@angular/core";
import { ActivityListComponent } from "./activity-list/activity-list.component";
import { TabViewModule } from 'primeng/tabview';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ActivityRouting } from "./activity.routing";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { ActivityInsertComponent } from "./activity-insert/activity-insert.component";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';



@NgModule({
    declarations: [
        ActivityListComponent, ActivityInsertComponent
    ],
    imports: [
        RouterModule, CommonModule, ActivityRouting,
        TabViewModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule,
        ConfirmDialogModule,
        HttpClientModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        DropdownModule,
        MenuModule,
    ],
    exports: [
        ActivityListComponent, ActivityInsertComponent
    ]
})
export class ActivityModule { }