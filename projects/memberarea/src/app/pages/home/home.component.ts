import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PostData } from "projects/interface/post/post-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { Subscription } from "rxjs";
import { POST_TYPE_ID } from "../../constant/post.type";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})

export class HomeComponent implements OnInit, OnDestroy {


    fileLink = BASE_URL.FILE

    type!: string

    posts: PostData[] = []

    like = true
    bookmark = true
    likeFill = false
    bookmarkFill = false
    allComment = false
    commentPost = false
    viewComment = true
    hideComment = false
    replyComment = true
    showReplyComment = false

    showForm = false
    showUploadImg = true
    showCreatePolling = false

    postTypeId!: string

    first = 0
    limit = 3


    postForm = this.fb.group({
        postTitle: ['', [Validators.required, Validators.maxLength(100)]],
        postContent: ['', [Validators.required]],
        postTypeId: ['', [Validators.required]],
        attachmentPostInsertReqs: this.fb.array([]),
        pollInsertReq: this.fb.group({
            pollTitle: ['', [Validators.required]],
            endAt: ['', [Validators.required]],
            postId: ['', [Validators.required]],
            pollOptionInsertReqs: this.fb.array([])
        })
    })

    private postInsertSubscription?: Subscription
    private postsSubscribtion?: Subscription

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private fileService: FileService, private postService: PostService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(result => {
            this.posts = result.data
        })
    }

    onScroll() {
        this.first += this.limit
        this.addData()
    }

    addData() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.posts.push(result.data[i])
            }
        })
    }

    showCreatePostDialog() {
        this.showForm = true
        this.postTypeId = POST_TYPE_ID.REGULAR
    }


    clickLike(i: number) {
        this.like = false
        this.likeFill = true
    }
    clickUnSave() {
        this.bookmark = true
        this.bookmarkFill = false
    }
    clickSave() {
        this.bookmark = false
        this.bookmarkFill = true
    }
    clickUnLike() {
        this.like = true
        this.likeFill = false
    }

    clickMoreComment() {
        this.allComment = true
        this.viewComment = false
        this.hideComment = true
    }

    clickCloseComment() {
        this.allComment = false
        this.viewComment = true
        this.hideComment = false
    }

    clickCommentPost() {
        this.commentPost = true
    }

    clickAddPhotos() {
        this.showUploadImg = true
        this.showCreatePolling = false
        this.postTypeId = POST_TYPE_ID.REGULAR
        this.postForm.reset()
    }
    clickCreatePoll() {
        this.showCreatePolling = true
        this.showUploadImg = false
        this.postTypeId = POST_TYPE_ID.POLLING
        this.postForm.reset()
    }

    clickReplyComment() {
        this.showReplyComment = true
    }

    get detailFoto(): FormArray {
        return this.postForm.get('attachmentPostInsertReqs') as FormArray
    }

    fileUpload(event: any) {
        console.log('masuk');
        this.fileService.fileUploadMulti(event).then(result => {
            for (let i = 0; i < result.length; i++) {
                this.detailFoto.push(this.fb.group({ extensions: result[i][0], fileCodes: result[i][1] }));
            }
        })
    }

    submitPost() {
        this.postForm.controls['postTypeId'].setValue(this.postTypeId)
        this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
            this.showForm = false
        })
    }


    ngOnDestroy(): void {
        this.postInsertSubscription?.unsubscribe()
        this.postsSubscribtion?.unsubscribe()
    }
}