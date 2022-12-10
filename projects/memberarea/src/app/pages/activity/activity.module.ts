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
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ImageModule } from "primeng/image";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        ActivityListComponent
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
        ImageModule,
        InfiniteScrollModule,
        MenuModule
    ],
    exports: [
        ActivityListComponent
    ]
})
export class ActivityModule { }