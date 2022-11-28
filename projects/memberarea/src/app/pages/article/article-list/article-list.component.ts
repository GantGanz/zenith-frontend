import { Component, OnDestroy, OnInit } from "@angular/core";
import { ArticleData } from "projects/interface/article/article-data";
import { ArticlesRes } from "projects/interface/article/articles-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-article",
    templateUrl: "./article-list.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ArticleListComponent implements OnInit, OnDestroy {

    data!: ArticleData[]

    first = 0
    limit = 6

    fileLink = BASE_URL.FILE

    private articlesSubscription?: Subscription
    private userSubscription?: Subscription

    constructor(private articleService: ArticleService, private userService: UserService) { }

    ngOnInit(): void {
        this.init()
    }

    onScroll() {
        this.limit += 3
        this.init()
    }

    init() {
        this.articlesSubscription = this.articleService.getAll(this.first, this.limit).subscribe(result => {
            this.data = result.data
        })

    }
    ngOnDestroy(): void {
        this.articlesSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
    }
}