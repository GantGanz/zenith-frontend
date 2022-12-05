import { Component, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "article-insert",
    templateUrl: "./article-insert.component.html"
})
export class ArticleInsertComponent implements OnDestroy {

    loading = false

    private articleSubscription?: Subscription

    articleForm = this.fb.group({
        articleTitle: [null, [Validators.required]],
        articleContent: [null, [Validators.required]],
        attachmentArticleInsertReqs: this.fb.array([])
    })

    constructor(private articleService: ArticleService, private fb: FormBuilder,
        private router: Router, private fileService: FileService) { }

    clickSubmit() {
        this.loading = true
        this.articleSubscription = this.articleService.insert(this.articleForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => {
            this.router.navigateByUrl('/articles-admin/list')
        })
    }
    get detailFoto(): FormArray {
        return this.articleForm.get('attachmentArticleInsertReqs') as FormArray
    }

    fileUpload(event: any) {
        this.fileService.fileUploadMulti(event).then(result => {
            this.detailFoto.push(this.fb.group({ extensions: result[0][0], fileCodes: result[0][1] }));
            console.log(this.articleForm.value);
        })
    }

    ngOnDestroy(): void {
        this.articleSubscription?.unsubscribe()
    }
}