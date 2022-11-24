import { NgModule } from "@angular/core";
import { IndustryInsertComponent } from "./industry-insert/industry-insert.component";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";
import { IndustryRouting } from "./industry.routing";
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";


@NgModule({
    declarations: [
        IndustryListComponent, IndustryInsertComponent, IndustryUpdateComponent
    ],
    imports: [
        IndustryRouting,
        TooltipModule,
        InputTextModule,
        TableModule,
        ButtonModule,
        ConfirmDialogModule,
        CommonModule,
        ReactiveFormsModule,
        CheckboxModule,
        ConfirmDialogModule
    ],
    exports: [
        IndustryListComponent, IndustryInsertComponent, IndustryUpdateComponent
    ]
})
export class IndustryModule { }