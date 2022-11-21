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



@NgModule({
    declarations: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ],
    imports: [
        RouterModule,
        ArticleRouting,
        TooltipModule,
        InputTextModule,
        TableModule,
        ButtonModule,
        InputTextareaModule,
        FileUploadModule
    ],
    exports: [
        ArticleListComponent, ArticleInsertComponent, ArticleUpdateComponent
    ]
})
export class ArticleModule { }