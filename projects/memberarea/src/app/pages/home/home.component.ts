import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { LikeService } from "projects/mainarea/src/app/service/like.service";
import { PostTypeService } from "projects/mainarea/src/app/service/post-type.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { Subscription } from "rxjs";
import { POST_TYPE_CODE, POST_TYPE_ID } from "../../constant/post.type";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})

export class HomeComponent implements OnInit, OnDestroy {


    fileLink = BASE_URL.FILE

    type!: string

    result: any[] = []
    likedPost: any[] = []

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
    regularPostCode = POST_TYPE_CODE.REGULAR
    pollPostCode = POST_TYPE_CODE.POLLING
    premiumPostCode = POST_TYPE_CODE.PREMIUM

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
            pollOptionInsertReqs: this.fb.array([
                this.fb.group({ pollContent: ['', Validators.required] })
            ])
        }),
        isPremium: [false, [Validators.required]]
    })

    likeForm = this.fb.group({
        id: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        postId: ['', [Validators.required]],
        version: [0, [Validators.required]]
    })



    private postInsertSubscription?: Subscription
    private postsSubscribtion?: Subscription
    private countLikeSubscription?: Subscription

    private likedPostSubscription?: Subscription

    private postTypeSubscription?: Subscription

    private isLikedSubscription?: Subscription
    private insertLikeSubscription?: Subscription
    private deleteLikeSubscription?: Subscription
    private likedIdSubscription?: Subscription

    constructor(private fb: FormBuilder,
        private fileService: FileService, private postService: PostService,
        private likeService: LikeService, private postTypeService: PostTypeService) { }

    ngOnInit(): void {
        this.postInit()
    }

    postInit() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result[i] = posts.data[i]
                this.countLikeSubscription = this.likeService.count(posts.data[i].id).subscribe(like => {
                    this.result[i].countLike = like
                })
                this.isLikedSubscription = this.likeService.liked(posts.data[i].id).subscribe(isLiked => {
                    this.result[i].isLiked = isLiked
                })
            }
        })
    }

    // likedInit(){
    //     this.likedPostSubscription = this.postService.
    // }

    onScroll() {
        this.first += this.limit
        this.addData()
    }

    addData() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.countLikeSubscription = this.likeService.count(posts.data[i].id).subscribe(like => {
                    this.result[i + this.first].countLike = like
                })
                this.isLikedSubscription = this.likeService.liked(posts.data[i].id).subscribe(isLiked => {
                    this.result[i + this.first].isLiked = isLiked
                })
            }
            console.log(this.result);

        })
    }

    showCreatePostDialog() {
        this.showForm = true
        this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.REGULAR).subscribe(result => {
            this.postTypeId = result.id         
        })
    }

    clickLike(i: number) {
        console.log("insert");
        this.likeForm.controls['userId'].setValue(this.result[i].userId)
        this.likeForm.controls['postId'].setValue(this.result[i].id)
        this.insertLikeSubscription = this.likeService.insert(this.likeForm.value).subscribe(() => {
            this.result[i].isLiked = true
            this.result[i].countLike += 1
        })
    }

    clickUnSave() {
        this.bookmark = true
        this.bookmarkFill = false
    }
    clickSave() {
        this.bookmark = false
        this.bookmarkFill = true
    }
    clickUnLike(i: number) {
        console.log("Unlike");
        this.likedIdSubscription = this.likeService.getId(this.result[i].id).subscribe(data => {
            console.log(data.id);
            this.deleteLikeSubscription = this.likeService.delete(data.id).subscribe(() => {
                this.result[i].isLiked = false
                this.result[i].countLike -= 1
            })
        })
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
        this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.REGULAR).subscribe(result => {
            this.postTypeId = result.id
        })
        this.postForm.reset()
    }
    clickCreatePoll() {
        this.showCreatePolling = true
        this.showUploadImg = false
        this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.POLLING).subscribe(result => {
            this.postTypeId = result.id
        })
        this.postForm.reset()
    }

    clickReplyComment() {
        this.showReplyComment = true
    }

    get detailFoto(): FormArray {
        return this.postForm.get('attachmentPostInsertReqs') as FormArray
    }

    get pollingOption(): FormArray {
        return this.postForm.get('pollInsertReq')?.get('pollOptionInsertReqs') as FormArray
    }

    fileUpload(event: any) {
        this.fileService.fileUploadMulti(event).then(result => {
            for (let i = 0; i < result.length; i++) {
                this.detailFoto.push(this.fb.group({ extensions: result[i][0], fileCodes: result[i][1] }));
            }
        })
    }

    submitPost() {
        this.postForm.controls['postTypeId'].setValue(this.postTypeId)
        if (this.postForm.value.isPremium) {
            this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.PREMIUM).subscribe(result => {
                this.postForm.controls['postTypeId'].setValue(result.id)
            })
        }
        this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
            this.showForm = false
        })
    }

    addPoll() {
        this.pollingOption.push(this.fb.group({ pollContent: ['', [Validators.required]] }))
    }

    removePoll(i: number) {
        this.pollingOption.removeAt(i)
    }

    ngOnDestroy(): void {
        this.postInsertSubscription?.unsubscribe()
        this.postsSubscribtion?.unsubscribe()
        this.countLikeSubscription?.unsubscribe()
        this.isLikedSubscription?.unsubscribe()
        this.insertLikeSubscription?.unsubscribe()
        this.deleteLikeSubscription?.unsubscribe()
        this.likedIdSubscription?.unsubscribe()
    }
}