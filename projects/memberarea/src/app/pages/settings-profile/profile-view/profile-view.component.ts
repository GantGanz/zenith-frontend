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
import { PollVoteService } from "projects/mainarea/src/app/service/poll-vote.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { finalize, Subscription } from "rxjs";
import { POST_TYPE_CODE, POST_TYPE_ID } from "../../../constant/post.type";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ProfileViewComponent implements OnInit, OnDestroy {

    postDelete = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]],
        postTitle: ['', [Validators.required, Validators.maxLength(100)]],
        postContent: ['', [Validators.required]],
        postTypeId: ['', [Validators.required]],
        isActive: [false],
    })

    voteForm = this.fb.group({
        pollOptionId: ['', [Validators.required]]
    })

    posts: any[] = []

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

    editComment = false

    dataEmpty = false
    dataNotEmpty = true

    totalCourse!: number
    totalEvent!: number
    totalIncome!: number

    fileLink = BASE_URL.FILE

    type!: string

    result: PostData[] = []
    likedPost: PostData[] = []
    myUser!: UserData

    fullName!: string
    email!: string
    positionName!: string
    company!: string
    isPremium!: boolean
    myId!: string
    myFileId!: string

    displayCustom!: boolean;
    activeIndex: number = 0;

    postTypeId!: string
    regularPostCode = POST_TYPE_CODE.REGULAR
    pollPostCode = POST_TYPE_CODE.POLLING
    premiumPostCode = POST_TYPE_CODE.PREMIUM

    postCount = 0

    first = 0
    limit = 3

    fileLoading = false
    buttonLoading = false

    totalMyPost!: number

    commentFirst = 0
    commentLimit = 3

    bookmarkForm = this.fb.group({
        postId: ['', [Validators.required]]
    })

    commentForm = this.fb.group({
        commentContent: ['', [Validators.required]],
        postId: ['', [Validators.required]]
    })

    updateCommentForm = this.fb.group({
        id: ['', [Validators.required]],
        commentContent: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    likeForm = this.fb.group({
        id: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        postId: ['', [Validators.required]],
        version: [0, [Validators.required]]
    })

    private postsSubscription?: Subscription
    private postCountSubscription?: Subscription
    private userSubscription?: Subscription

    private insertBookmarkSubscription?: Subscription
    private insertLikeSubscription?: Subscription

    private insertCommentSubscription?: Subscription
    private commentByPostSubscription?: Subscription
    private updateCommentSubscription?: Subscription
    private deleteCommentSubscription?: Subscription
    private commentByIdSubscription?: Subscription

    private bookmarkedIdSubscription?: Subscription
    private deleteBookmarkSubscription?: Subscription
    private deleteLikeSubscription?: Subscription
    private likedIdSubscription?: Subscription
    private deleteSubscription?: Subscription
    private postSubscription?: Subscription
    private countSubscription?: Subscription
    private insertVoteSubscription?: Subscription


    private totalCourseSubscription?: Subscription
    private totalEventSubscription?: Subscription

    constructor(private fb: FormBuilder, private postService: PostService, private userService: UserService,
        private paymentActivityService: PaymentActivityService, private activityService: ActivityService,
        private router: Router, private confirmationService: ConfirmationService, private bookmarkService: BookmarkService,
        private commentService: CommentService, private likeService: LikeService, private pollVoteService: PollVoteService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.first = 0
        this.countSubscription = this.postService.countMyPosts().subscribe(result => {
            this.totalMyPost = result
        })

        this.userSubscription = this.userService.getByPrincipal().pipe(finalize(() => this.fileLoading = true)).subscribe(result => {
            this.myUser = result.data
            this.myId = this.myUser.id
            this.myFileId = this.myUser.fileId
            this.fullName = this.myUser.fullname
            this.email = this.myUser.email
            this.company = this.myUser.company
            this.positionName = this.myUser.positionName
            this.isPremium = this.myUser.isPremium
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
        this.postsSubscription = this.postService.getAllByUser(this.first, this.limit).subscribe(posts => {
            this.result = posts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
                this.result[i].showMoreComment = false
                this.result[i].commentOffset = 0
            }
        })
        this.postCountSubscription = this.postService.countMyPosts().subscribe(count => {
            this.postCount = count
        })
    }


    addData() {
        this.postsSubscription = this.postService.getAllByUser(this.first, this.limit).subscribe(posts => {
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

    clickVote(i: number, pollIndex: number) {
        this.voteForm.controls['pollOptionId'].setValue(this.result[i].pollData.pollOptionDatas[pollIndex].id)

        this.insertVoteSubscription = this.pollVoteService.insert(this.voteForm.value).subscribe(() => {
            this.result[i].pollData.isVoted = true
            this.result[i].pollData.countVote += 1
            this.result[i].pollData.pollOptionDatas[pollIndex].isVoted = true
            this.result[i].pollData.pollOptionDatas[pollIndex].countVote += 1
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
            for (let i = 0; i < comments.data.length; i++) {
                this.result[index].commentDatas[i].editComment = false
            }
            if (this.result[index].countComment <= this.result[index].commentDatas.length) {
                this.result[index].showMoreComment = false
            } else {
                this.result[index].showMoreComment = true
            }
        })
    }

    clickEditComment(postIndex: number, commentIndex: number) {
        this.editComment = true
        this.result[postIndex].commentDatas[commentIndex].editComment = true
        this.updateCommentForm.patchValue(this.result[postIndex].commentDatas[commentIndex])
    }

    cancelEdit(postIndex: number, commentIndex: number) {
        this.editComment = false
        this.result[postIndex].commentDatas[commentIndex].editComment = false
        this.updateCommentForm.reset()
    }

    seeMoreComment(index: number) {
        this.result[index].commentOffset += this.commentLimit
        this.commentByPostSubscription = this.commentService.getAllByPost(this.result[index].id, this.result[index].commentOffset, this.commentLimit).subscribe(comments => {
            for (let i = 0; i < comments.data.length; i++) {
                this.result[index].commentDatas.push(comments.data[i])
                this.result[index].commentDatas[i + this.result[index].commentOffset].editComment = false
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

    submitComment(postIndex: number) {
        this.commentForm.controls['postId'].setValue(this.result[postIndex].id)
        this.insertCommentSubscription = this.commentService.insert(this.commentForm.value).subscribe(() => {
            this.clickSeeComment(postIndex)
            this.result[postIndex].countComment += 1
            this.commentForm.reset()
        })
    }

    submitEditComment(postIndex: number, commentIndex: number) {
        this.buttonLoading = true
        this.updateCommentSubscription = this.commentService.updateComment(this.updateCommentForm.value).pipe(finalize(() => {
            this.editComment = false
            this.result[postIndex].commentDatas[commentIndex].editComment = false
            this.buttonLoading = false
        })).subscribe(() => {
            this.commentByIdSubscription = this.commentService.getByIdComment(this.updateCommentForm.value.id!).subscribe(comment => {
                this.result[postIndex].commentDatas.splice(commentIndex, 1, comment.data)
            })
        })
    }

    onScroll() {
        this.first += this.limit
        if (this.result.length < this.postCount) {
            this.addData()
        }
    }

    clickEditProfile() {
        this.router.navigateByUrl(`/profile/edit/${this.myUser.id}`)
    }
    clickChangePassword() {
        this.router.navigateByUrl(`/profile/change-password/${this.myUser.id}`)
    }

    clickConfirmDelete(index: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this post?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.postDelete.patchValue(this.result[index])

                this.deleteSubscription = this.postService.update(this.postDelete.value).subscribe(a => {
                    this.addData()
                    this.postCount -= 1
                    this.result.splice(index, 1)
                })
            }
        })
    }


    clickConfirmDeleteComment(postIndex: number, commentIndex: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Comment?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.updateCommentForm.patchValue(this.result[postIndex].commentDatas[commentIndex])
                this.deleteCommentSubscription = this.commentService.deleteComment(this.updateCommentForm.value).subscribe(() => {
                    this.result[postIndex].commentDatas.splice(commentIndex, 1)
                    this.result[postIndex].countComment -= 1
                    this.result[postIndex].commentOffset -= 1
                })
            }
        })
    }

    pollValue(poll: any, pollData: any) {
        return Math.round(poll.countVote / pollData.countVote * 100)
    }

    ngOnDestroy(): void {
        this.postsSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
        this.totalEventSubscription?.unsubscribe()
        this.totalCourseSubscription?.unsubscribe()

        this.insertBookmarkSubscription?.unsubscribe()
        this.insertLikeSubscription?.unsubscribe()

        this.insertCommentSubscription?.unsubscribe()
        this.commentByPostSubscription?.unsubscribe()
        this.bookmarkedIdSubscription?.unsubscribe()
        this.deleteBookmarkSubscription?.unsubscribe()
        this.deleteLikeSubscription?.unsubscribe()
        this.likedIdSubscription?.unsubscribe()
        this.postSubscription?.unsubscribe()
        this.postCountSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
        this.insertVoteSubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}

