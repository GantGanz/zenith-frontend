import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleData } from "projects/interface/article/article-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { Subscription } from "rxjs";


@Component({
    selector: "article-detail",
    templateUrl: "./article-detail.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

    private paramSubscription?: Subscription
    private articleSubscription?: Subscription
    private articlesSubscription?: Subscription

    articles!: ArticleData[]

    title = ''
    fullname = ''
    createdAt = ''
    fileId = ''
    articleContent = ''

    fileLink = BASE_URL.FILE

    constructor(private active: ActivatedRoute, private articleService: ArticleService, private router: Router) { }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.articleSubscription = this.articleService.getById(id).subscribe(result => {
                this.title = result.data.articleTitle
                this.fullname = result.data.fullname
                this.createdAt = result.data.createdAt
                this.fileId = result.data.attachmentArticleDatas[0].fileId
                this.articleContent = result.data.articleContent
            })
        })
        this.articlesSubscription = this.articleService.getAll(0, 3).subscribe(result => {
            this.articles = result.data
        })
    }
    clickBack() {
        this.router.navigateByUrl("/articles")
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.articleSubscription?.unsubscribe()
        this.articlesSubscription?.unsubscribe()
    }
}