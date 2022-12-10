import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GalleriaModule } from 'primeng/galleria';
import { MenuModule } from 'primeng/menu'
import { TabMenuModule } from 'primeng/tabmenu'
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { rightContentComponent } from "./right-content/right-content.component";
import { CheckboxModule } from 'primeng/checkbox';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { BlockUIModule } from 'primeng/blockui';
import { ImageModule } from 'primeng/image';
import { TimeModule } from "projects/mainarea/src/app/pipe/time-ago.module";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from "primeng/dropdown";

@NgModule({
    declarations: [
        HomeComponent, rightContentComponent
    ],
    imports: [
        RouterModule,
        HomeRouting,
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        GalleriaModule,
        MenuModule,
        TabMenuModule,
        DialogModule,
        FileUploadModule,
        HttpClientModule,
        TooltipModule,
        DividerModule,
        CalendarModule,
        TabViewModule,
        ReactiveFormsModule,
        CheckboxModule,
        InfiniteScrollModule,
        BlockUIModule,
        ImageModule,
        TimeModule,
        ProgressSpinnerModule,
        StyleClassModule,
        FormsModule,
        ConfirmDialogModule,
        AutoFocusModule,


        ScrollPanelModule,
        DropdownModule
    ],
    exports: [
        HomeComponent, rightContentComponent
    ]
})

export class HomeModule { }