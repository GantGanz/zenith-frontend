import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleRouting } from "./article.routing";
import { ButtonModule } from "primeng/button";
import { DividerModule } from 'primeng/divider'
import { CommonModule } from "@angular/common";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { TimeModule } from "projects/mainarea/src/app/pipe/time-ago.module";

@NgModule({
    declarations: [
        ArticleListComponent, ArticleDetailComponent
    ],
    imports: [
        RouterModule, ArticleRouting,
        ButtonModule,
        DividerModule,
        CommonModule,
        InfiniteScrollModule,
        TimeModule
    ],
    exports: [
        ArticleListComponent, ArticleDetailComponent
    ]
})
export class ArticleModule { }