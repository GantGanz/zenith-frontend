import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticleData } from "projects/interface/article/article-data";
import { ArticleRes } from "projects/interface/article/article-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: "article-detail",
    templateUrl: "./article-detail.component.html"
})
export class ArticleDetailComponent implements OnInit, OnDestroy{

    private paramSubscription?: Subscription
    private articleSubscription?: Subscription

    article!: ArticleData

    fileLink = BASE_URL.FILE

    constructor(private active: ActivatedRoute, private articleService:ArticleService){}
    
    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u=>{
            const id = String(Object.values(u))
            this.articleSubscription = this.articleService.getById(id).subscribe(result=>{
                this.article = result.data
            })
        })
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.articleSubscription?.unsubscribe()
    }


}