import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { Subscription } from "rxjs";
import { POST_TYPE_ID } from "../../../constant/post.type";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ProfileViewComponent implements OnInit, OnDestroy {

    type!: string

    posts: any[] = []

    like = true
    bookmark = true
    likeFill = false
    bookmarkFill = false
    allComment = false
    commentPost = false
    viewComment = true
    hideComment = false

    showForm = false
    showUploadImg = true
    showCreatePolling = false

    postTypeId!: string

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
        private fileService: FileService, private postService: PostService, private router: Router) { }

    ngOnInit(): void {

    }

    init() {
        this.postInsertSubscription = this.postService.getAllRegular().subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.posts.push(result.data[i])
            }
        })
    }

    showCreatePostDialog() {
        this.showForm = true
        this.postTypeId = POST_TYPE_ID.REGULAR
    }


    clickLike() {
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
    clickEditProfile() {
        this.router.navigateByUrl("/profile/edit/:id")
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
    }

}