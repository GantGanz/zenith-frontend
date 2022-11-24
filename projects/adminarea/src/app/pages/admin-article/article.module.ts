import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleRouting } from "./article.routing";
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleInsertComponent } from "./article-insert/article-insert.component";
import { ArticleUpdateComponent } from "./article-update/article-update.component";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload'
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ],
    imports: [
        RouterModule, CommonModule, ArticleRouting,
        TooltipModule,
        InputTextModule,
        TableModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule,
        ConfirmDialogModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    exports: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ]
})
export class ArticleModule { }