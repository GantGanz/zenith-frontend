import { Component } from "@angular/core";
import { ArticleData } from "projects/interface/article/article-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: "right-content",
    templateUrl: "./right-content.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class rightContentComponent {
    data!: ArticleData[]
    fileLink = BASE_URL.FILE
    first = 0
    limit = 3

    private articlesSubscription?: Subscription
    private userSubscription?: Subscription

    constructor(private articleService: ArticleService) { }

    ngOnInit(): void {
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