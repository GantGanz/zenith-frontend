import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRouting } from "./article.routing";
import { ButtonModule } from "primeng/button";
import { DividerModule } from 'primeng/divider'

@NgModule({
    declarations: [
        ArticleListComponent, ArticleDetailComponent
    ],
    imports: [
        RouterModule, ArticleRouting,
        ButtonModule,
        DividerModule
    ],
    exports: [
        ArticleListComponent, ArticleDetailComponent
    ]
})
export class ArticleModule { }