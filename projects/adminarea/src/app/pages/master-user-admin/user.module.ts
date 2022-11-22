import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UserInsertComponent } from "./user-insert/user-insert.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { UserRouting } from "./user.routing";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from "@angular/common";
import { ConfirmDialogModule } from 'primeng/confirmdialog';




@NgModule({
    declarations: [
        UserListComponent, UserInsertComponent, UserUpdateComponent
    ],
    imports: [
        RouterModule,
        UserRouting,
        TableModule,
        ButtonModule,
        TooltipModule,
        FileUploadModule,
        InputTextModule,
        DropdownModule,
        ReactiveFormsModule,
        CheckboxModule,
        FormsModule,
        CommonModule,
        ConfirmDialogModule
    ],
    exports: [
        UserListComponent, UserInsertComponent, UserUpdateComponent
    ]
})
export class UserModule { }