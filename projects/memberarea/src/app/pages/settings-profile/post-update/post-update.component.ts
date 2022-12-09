import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostData } from "projects/interface/post/post-data";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { finalize, Subscription } from "rxjs";


@Component({
    selector: "post-update",
    templateUrl: "./post-update.component.html"
})
export class PostUpdateComponent implements OnInit, OnDestroy {

    private paramSubscription?: Subscription
    private postsSubscribtion?: Subscription
    private updateSubscription?: Subscription

    postLoading = false
    updateLoading = false

    postRes!: PostData

    constructor(private fb: FormBuilder, private active: ActivatedRoute, private postService: PostService, private router: Router) { }

    postUpdateForm = this.fb.group({
        id: ['', [Validators.required]],
        postTitle: ['', [Validators.required, Validators.maxLength(100)]],
        postContent: ['', [Validators.required]],
        postTypeId: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]],
        attachmentPostInsertReqs: this.fb.array([]),
        pollInsertReq: this.fb.group({
            pollTitle: ['', [Validators.required]],
            endAt: ['', [Validators.required]],
            pollOptionInsertReqs: this.fb.array([
                this.fb.group({ pollContent: ['', Validators.required] }),
                this.fb.group({ pollContent: ['', Validators.required] })
            ])
        }),
        isPremium: [false, [Validators.required]]
    })

    ngOnInit(): void {
        this.init()
    }


    init() {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.postsSubscribtion = this.postService.getById(id).pipe(finalize(() => this.postLoading = true)).subscribe(result => {
                this.postUpdateForm.patchValue(result.data)
                this.postRes = result.data
            })
        })
    }

    clickBack() {
        this.router.navigateByUrl("/profile")
    }

    clickUpdate() {
        this.updateLoading = true
        this.updateSubscription = this.postService.update(this.postUpdateForm.value).pipe(finalize(() => this.updateLoading = false)).subscribe()
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.postsSubscribtion?.unsubscribe()
        this.updateSubscription?.unsubscribe()
    }
}