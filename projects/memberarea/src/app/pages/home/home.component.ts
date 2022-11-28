import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { PostData } from "projects/interface/post/post-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { LikeService } from "projects/mainarea/src/app/service/like.service";
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

    result: any[] = []

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
        }),
        isPremium: [false, [Validators.required]]
    })

    likeForm = this.fb.group({
        id:['',[Validators.required]],
        userId:['',[Validators.required]],
        postId:['',[Validators.required]],
        version:[0,[Validators.required]]
    })

    private postInsertSubscription?: Subscription
    private postsSubscribtion?: Subscription
    private countLikeSubscription?: Subscription
    private isLikedSubscription?: Subscription
    private likeSubscription?: Subscription
    private insertLikeSubscription?: Subscription
    private updateLikeSubscription?: Subscription

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
        private fileService: FileService, private postService: PostService,
        private likeService: LikeService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result[i] = posts.data[i]
                this.countLikeSubscription = this.likeService.count(posts.data[i].id).subscribe(like => {
                    this.result[i].countLike = like
                    
                })
                this.isLikedSubscription = this.likeService.liked(posts.data[i].id).subscribe(isLiked => {
                    console.log(isLiked);
                    this.result[i].likeId = isLiked
                })
            }
        })
    }

    onScroll() {
        this.first += this.limit
        this.addData()
    }

    addData() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.countLikeSubscription = this.likeService.count(posts.data[i].id).subscribe(like => {
                    this.result[i+this.first].countLike = like
                })
                this.isLikedSubscription = this.likeService.liked(posts.data[i].id).subscribe(isLiked => {
                    this.result[i+this.first].likeId = isLiked
                })
            }
            console.log(this.result);
            
        })
    }

    showCreatePostDialog() {
        this.showForm = true
        this.postTypeId = POST_TYPE_ID.REGULAR
    }

    clickLike(i: number) {
        if(this.result[i].isLiked){
            this.like = false
        } else{
            this.isLikedSubscription = this.likeService.liked(this.result[i].id).subscribe(liked=>{
                if(liked){
                    this.likeForm.controls['id'].setValue(this.result[i].id)
                    this.likeForm.controls['version'].setValue(this.result[i].version)
                    this.updateLikeSubscription = this.likeService.update(this.likeForm.value).subscribe(()=>{
                        this.addData()
                    })
                }else{
                    this.likeForm.controls['userId'].setValue(this.result[i].userId)
                    this.likeForm.controls['postId'].setValue(this.result[i].id)
                    this.insertLikeSubscription = this.likeService.insert(this.likeForm.value).subscribe(()=>{
                        this.addData()
                    })
                }
            })
            this.likeFill = true
        }

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
        if (this.postForm.value.isPremium) {
            this.postForm.controls['postTypeId'].setValue(POST_TYPE_ID.PREMIUM)
        }
        this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
            this.showForm = false
        })
    }


    ngOnDestroy(): void {
        this.postInsertSubscription?.unsubscribe()
        this.postsSubscribtion?.unsubscribe()
        this.countLikeSubscription?.unsubscribe()
        this.isLikedSubscription?.unsubscribe()
    }
}