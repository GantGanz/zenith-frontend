import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyActivityComponent } from "./my-activity.component";
import { MyActivityRouting } from "./my-activity.routing";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DropdownModule } from "primeng/dropdown";
import { CalendarModule } from "primeng/calendar";
import { FileUploadModule } from "primeng/fileupload";
import { InputNumberModule } from "primeng/inputnumber";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyActivityUpdateComponent } from "./my-activity-edit/my-activity-update.component";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CheckboxModule } from "primeng/checkbox";
import { MyActivityInsertComponent } from "./my-activity-insert/my-activity-insert.component";


@NgModule({
    declarations: [
        MyActivityComponent, MyActivityUpdateComponent, MyActivityInsertComponent
    ],
    imports: [
        RouterModule, CommonModule, MyActivityRouting,
        TabViewModule,
        ButtonModule,
        ImageModule,
        InfiniteScrollModule,
        DropdownModule,
        CalendarModule,
        FileUploadModule,
        InputNumberModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ConfirmDialogModule,
        CheckboxModule
    ],
    exports: [
        MyActivityComponent, MyActivityUpdateComponent, MyActivityInsertComponent
    ]
})
export class MyActivityModule { }