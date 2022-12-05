import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "article-list",
    templateUrl: "./article-list.component.html",
    styleUrls: ["../../../../styles.css"],
    providers: [ConfirmationService]
})
export class ArticleListComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE

    first = 0;
    rows = 10;
    position: string = 'top'
    articlesRes: any[] = []

    limit = this.rows
    totalArticles!: number

    tableLoad = false

    private articlesSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription
    private deleteSubscription?: Subscription

    articleDelete = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]],
        articleTitle: [''],
        articleContent: [''],
        isActive: [false]
    })

    constructor(private confirmationService: ConfirmationService, private articleService: ArticleService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.tableLoad = true
        this.articlesSubscription = this.articleService.getAllById(this.first, this.limit).pipe(finalize(() => this.tableLoad = false)).subscribe(result => {
            this.articlesRes = result.data
        })
        this.countSubscription = this.articleService.countAllById().subscribe(result => {
            this.totalArticles = result
        })
    }

    clickConfirmDelete(index: number) {
        const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to delete this article?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.articleDelete.controls['id'].setValue(this.articlesRes[i].id)
                this.articleDelete.controls['version'].setValue(this.articlesRes[i].version)
                this.articleDelete.controls['articleTitle'].setValue(this.articlesRes[i].articleTitle)
                this.articleDelete.controls['articleContent'].setValue(this.articlesRes[i].articleContent)
                this.deleteSubscription = this.articleService.update(this.articleDelete.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    getData(offset: number, limit: number) {
        this.tableLoad = true
        this.pageChangeSubscription = this.articleService.getAllById(offset, limit).pipe(finalize(() => this.tableLoad = false)).subscribe(result => {
            this.articlesRes = result.data
        })
    }

    loadData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.articlesSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}