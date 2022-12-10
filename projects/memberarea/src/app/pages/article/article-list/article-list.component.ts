import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ArticleData } from "projects/interface/article/article-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-article",
    templateUrl: "./article-list.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ArticleListComponent implements OnInit, OnDestroy {

    data!: ArticleData[]

    first = 0
    limit = 3

    fileLink = BASE_URL.FILE

    private articlesSubscription?: Subscription
    private userSubscription?: Subscription

    constructor(private articleService: ArticleService, private title: Title) { 
        this.title.setTitle('Article | Zenith')
    }

    ngOnInit(): void {
        this.init()
    }

    onScroll() {
        this.first += this.limit
        this.addData()
    }

    init() {
        this.articlesSubscription = this.articleService.getAll(this.first, this.limit).subscribe(result => {
            this.data = result.data
        })
    }

    addData() {
        this.articlesSubscription = this.articleService.getAll(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.data.push(result.data[i])
            }
        })
    }

    ngOnDestroy(): void {
        this.articlesSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
    }
}