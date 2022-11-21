import { Component } from "@angular/core";

@Component({
    selector: "article-list",
    templateUrl: "./article-list.component.html"
})
export class ArticleListComponent {
    articles: any = [
        {
            no: "1",
            title: "How to create a UX case study without an experience",
            content: "lorem ipsum",
        }
    ]
}