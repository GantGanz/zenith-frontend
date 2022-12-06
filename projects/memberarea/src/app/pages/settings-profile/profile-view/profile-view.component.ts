import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { PostData } from "projects/interface/post/post-data";
import { PostRes } from "projects/interface/post/post-res";
import { PostsRes } from "projects/interface/post/posts-res";
import { UserData } from "projects/interface/user/user-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { BookmarkService } from "projects/mainarea/src/app/service/bookmark.service";
import { CommentService } from "projects/mainarea/src/app/service/comment.service";
import { LikeService } from "projects/mainarea/src/app/service/like.service";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";
import { POST_TYPE_CODE, POST_TYPE_ID } from "../../../constant/post.type";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ProfileViewComponent implements OnInit, OnDestroy {

    postDelete = this.fb.group({
        id: ['', [Validators.required]],
        postTitle: ['', [Validators.required, Validators.maxLength(100)]],
        postContent: ['', [Validators.required]],
        postTypeId: ['', [Validators.required]],
        attachmentPostInsertReqs: this.fb.array([]),
        // pollInsertReq: this.fb.group({
        //     pollTitle: ['', [Validators.required]],
        //     endAt: ['', [Validators.required]],
        //     pollOptionInsertReqs: this.fb.array([
        //         this.fb.group({ pollContent: ['', Validators.required] }),
        //         this.fb.group({ pollContent: ['', Validators.required] })
        //     ])
        // }),
        isPremium: [false, [Validators.required]]
    })

    posts: any[] = []

    postRes!: PostsRes

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

    dataEmpty = false
    dataNotEmpty = true

    totalCourse!: number
    totalEvent!: number
    totalIncome!: number

    id!: string
    fullname!: string
    email!: string
    position!: string
    company!: string
    fileLink = BASE_URL.FILE
    myFileId!: string

    type!: string

    result: PostData[] = []
    likedPost: PostData[] = []
    myUser!: UserData

    displayCustom!: boolean;
    activeIndex: number = 0;

    postTypeId!: string
    regularPostCode = POST_TYPE_CODE.REGULAR
    pollPostCode = POST_TYPE_CODE.POLLING
    premiumPostCode = POST_TYPE_CODE.PREMIUM

    tabIndex = 0

    first = 0
    limit = 3
    fileLoading = false

    commentFirst = 0
    commentLimit = 3

    bookmarkForm = this.fb.group({
        postId: ['', [Validators.required]]
    })

    commentForm = this.fb.group({
        commentContent: ['', [Validators.required]],
        postId: ['', [Validators.required]]
    })

    likeForm = this.fb.group({
        id: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        postId: ['', [Validators.required]],
        version: [0, [Validators.required]]
    })

    private postsSubscription?: Subscription
    private userSubscription?: Subscription

    private insertBookmarkSubscription?: Subscription
    private insertLikeSubscription?: Subscription
    private insertCommentSubscription?: Subscription
    private commentByPostSubscription?: Subscription
    private bookmarkedIdSubscription?: Subscription
    private deleteBookmarkSubscription?: Subscription
    private deleteLikeSubscription?: Subscription
    private likedIdSubscription?: Subscription



    private totalCourseSubscription?: Subscription
    private totalEventSubscription?: Subscription
    private totalIncomeSubscription?: Subscription

    constructor(private fb: FormBuilder, private postService: PostService, private userService: UserService,
        private paymentActivityService: PaymentActivityService, private activityService: ActivityService,
        private router: Router, private confirmationService: ConfirmationService, private bookmarkService: BookmarkService,
        private commentService: CommentService, private likeService: LikeService,) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.id = result.data.id
            this.fullname = result.data.fullname
            this.email = result.data.email
            this.position = result.data.positionName
            this.company = result.data.company
            this.myFileId = result.data.fileId
        })

        this.totalCourseSubscription = this.activityService.countCourse().subscribe(result => {
            this.totalCourse = result
        })
        this.totalEventSubscription = this.activityService.countEvent().subscribe(result => {
            this.totalEvent = result
        })
        this.totalCourseSubscription = this.paymentActivityService.getCreatorIncome().subscribe(result => {
            this.totalIncome = result
        })

        this.postInit()
    }

    postInit() {
        this.postsSubscription = this.postService.getAllById(this.first, this.limit).subscribe(posts => {
            this.result = posts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
                this.result[i].showMoreComment = false
                this.result[i].commentOffset = 0
            }
        })
    }


    addData() {
        this.postsSubscription = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.result[i + this.first].commentStatus = false
                this.result[i + this.first].moreComment = false
                this.result[i + this.first].showImg = false
                this.result[i + this.first].showMoreComment = false
                this.result[i + this.first].commentOffset = 0
            }
        })
    }

    addDataLiked() {
        this.postsSubscription = this.postService.getAllLiked(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.result[i + this.first].commentStatus = false
                this.result[i + this.first].moreComment = false
                this.result[i + this.first].showImg = false
                this.result[i + this.first].showMoreComment = false
                this.result[i + this.first].commentOffset = 0
            }
        })
    }

    addDataBookmarked() {
        this.postsSubscription = this.postService.getAllBookmarked(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.result[i + this.first].commentStatus = false
                this.result[i + this.first].moreComment = false
                this.result[i + this.first].showImg = false
                this.result[i + this.first].showMoreComment = false
                this.result[i + this.first].commentOffset = 0
            }
        })
    }

    clickCommentPost(postIndex: number) {
        this.result[postIndex].commentStatus = true
    }

    clickLike(i: number) {
        this.likeForm.controls['postId'].setValue(this.result[i].id)
        this.insertLikeSubscription = this.likeService.insert(this.likeForm.value).subscribe(() => {
            this.result[i].isLiked = true
            this.result[i].countLike += 1
        })
    }
    clickUnLike(i: number) {
        this.likedIdSubscription = this.likeService.getId(this.result[i].id).subscribe(data => {
            this.deleteLikeSubscription = this.likeService.delete(data.id).subscribe(() => {
                this.result[i].isLiked = false
                this.result[i].countLike -= 1
                if (this.tabIndex == 1) {
                    this.result.splice(i, 1)
                }
            })
        })
    }

    clickSave(i: number) {
        this.bookmarkForm.controls['postId'].setValue(this.result[i].id)
        this.insertBookmarkSubscription = this.bookmarkService.insert(this.bookmarkForm.value).subscribe(() => {
            this.result[i].isBookmarked = true
        })
    }
    clickUnSave(i: number) {
        this.bookmarkedIdSubscription = this.bookmarkService.getId(this.result[i].id).subscribe(data => {
            this.deleteBookmarkSubscription = this.bookmarkService.delete(data.id).subscribe(() => {
                this.result[i].isBookmarked = false
                if (this.tabIndex == 2) {
                    this.result.splice(i, 1)
                }
            })
        })
    }


    clickMoreComment() {
        this.allComment = true
        this.viewComment = false
        this.hideComment = true
    }

    clickReplyComment() {
        this.showReplyComment = true
    }

    clickSeeComment(index: number) {
        this.result[index].moreComment = true
        this.commentByPostSubscription = this.commentService.getAllByPost(this.result[index].id, this.commentFirst, this.commentLimit).subscribe(comments => {
            this.result[index].commentDatas = comments.data
            if (this.result[index].countComment <= this.result[index].commentDatas.length) {
                this.result[index].showMoreComment = false
            } else {
                this.result[index].showMoreComment = true
            }
        })
    }

    seeMoreComment(index: number) {
        this.result[index].commentOffset += this.commentLimit
        this.commentByPostSubscription = this.commentService.getAllByPost(this.result[index].id, this.result[index].commentOffset, this.commentLimit).subscribe(comments => {
            for (let i = 0; i < comments.data.length; i++) {
                this.result[index].commentDatas.push(comments.data[i])
            }
            if (this.result[index].countComment <= this.result[index].commentDatas.length) {
                this.result[index].showMoreComment = false
            } else {
                this.result[index].showMoreComment = true
            }
        })
    }

    clickCloseComment(index: number) {
        this.result[index].moreComment = false
        this.result[index].commentOffset = 0
    }

    imageClick(index: number, indexPhoto: number) {
        this.activeIndex = indexPhoto;
        this.result[index].showImg = true
    }

    submitcomment(postIndex: number) {
        this.commentForm.controls['postId'].setValue(this.result[postIndex].id)
        this.insertCommentSubscription = this.commentService.insert(this.commentForm.value).subscribe(() => {
            this.clickSeeComment(postIndex)
            this.result[postIndex].countComment += 1
            this.commentForm.reset()
        })
    }




    clickEditProfile() {
        this.router.navigateByUrl(`/profile/edit/${this.id}`)
    }
    clickChangePassword() {
        this.router.navigateByUrl(`/profile/change-password/${this.id}`)
    }

    clickConfirmDelete(index: number) {
        const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to delete this post?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.postDelete.controls['id'].setValue(this.postRes.data[i].id)
                this.postDelete.controls['postTitle'].setValue(this.postRes.data[i].postTitle)
                this.postDelete.controls['postContent'].setValue(this.postRes.data[i].postContent)
                this.postDelete.controls['postTypeId'].setValue(this.postRes.data[i].postTypeId)
            }
        })
    }


    ngOnDestroy(): void {
        this.postsSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
        this.totalEventSubscription?.unsubscribe()
        this.totalCourseSubscription?.unsubscribe()
        this.totalIncomeSubscription?.unsubscribe()
    }
}