import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { Subscription } from "rxjs";

@Component({
    selector: "article-update",
    templateUrl: "./article-update.component.html"
})
export class ArticleUpdateComponent implements OnInit, OnDestroy {

    private articleSubscription?: Subscription
    private articleUpdateSubscription?: Subscription
    private paramSubscription?: Subscription

    articleForm = this.fb.group({
        id: ['', [Validators.required]],
        articleTitle: ['', [Validators.required]],
        articleContent: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    constructor(private articleService: ArticleService, private fb: FormBuilder,
        private router: Router, private active: ActivatedRoute) { }


    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.articleSubscription = this.articleService.getById(id).subscribe(result => {
                this.articleForm.controls['id'].setValue(result.data.id)
                this.articleForm.controls['articleTitle'].setValue(result.data.articleTitle)
                this.articleForm.controls['articleContent'].setValue(result.data.articleContent)
                this.articleForm.controls['isActive'].setValue(result.data.isActive)
                this.articleForm.controls['version'].setValue(result.data.version)
            })
        })
    }

    clickUpdate() {
        this.articleUpdateSubscription = this.articleService.update(this.articleForm.value).subscribe(() => {
            this.router.navigateByUrl('/articles-admin/list')
        })
    }

    ngOnDestroy(): void {
        this.articleSubscription?.unsubscribe()
        this.articleUpdateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
    }
}