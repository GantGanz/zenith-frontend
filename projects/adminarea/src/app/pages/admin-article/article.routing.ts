import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContentComponent } from "../../component/content/admin/admin.content.component";
import { ArticleInsertComponent } from "./article-insert/article-insert.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleUpdateComponent } from "./article-update/article-update.component";


const routes: Routes = [
    {
        path: "",
        component: AdminContentComponent,
        children: [
            {
                path: "list",
                component: ArticleListComponent
            },
            {
                path: "new",
                component: ArticleInsertComponent
            },
            {
                path: "edit/:id",
                component: ArticleUpdateComponent
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticleRouting { }