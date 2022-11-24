import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRouting } from "./article.routing";

@NgModule({
    declarations: [
        ArticleListComponent, ArticleDetailComponent
    ],
    imports: [
        RouterModule, ArticleRouting
    ],
    exports: [
        ArticleListComponent, ArticleDetailComponent
    ]
})
export class ArticleModule { }