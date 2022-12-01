import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
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
    replyComment = true
    showReplyComment = false

    showForm = false
    showUploadImg = true
    showCreatePolling = false

    totalCourse!: number
    totalEvent!: number
    totalIncome!: number
    id!: string
    fullname!: string
    email!: string
    position!: string
    company!: string
    fileLink = BASE_URL.FILE
    fileId!: string

    postTypeId!: string

    private postsSubscribtion?: Subscription
    private userSubscribtion?: Subscription
    private totalCourseSubscribtion?: Subscription
    private totalEventSubscribtion?: Subscription
    private totalIncomeSubscribtion?: Subscription

    constructor(private postService: PostService, private userService: UserService, private paymentActivityService: PaymentActivityService, private activityService: ActivityService, private router: Router) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.userSubscribtion = this.userService.getByPrincipal().subscribe(result => {
            this.id = result.data.id
            this.fullname = result.data.fullname
            this.email = result.data.email
            this.position = result.data.positionName
            this.company = result.data.company
            this.fileId = result.data.fileId
        })

        this.postsSubscribtion = this.postService.getAllRegular().subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.posts.push(result.data[i])
            }
        })

        this.totalCourseSubscribtion = this.activityService.countCourse().subscribe(result => {
            this.totalCourse = result
        })
        this.totalEventSubscribtion = this.activityService.countEvent().subscribe(result => {
            this.totalEvent = result
        })
        this.totalCourseSubscribtion = this.paymentActivityService.getCreatorIncome().subscribe(result => {
            this.totalIncome = result
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
    clickCommentPost() {
        this.commentPost = true
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
    clickReplyComment() {
        this.showReplyComment = true
    }

    clickEditProfile() {
        this.router.navigateByUrl(`/profile/edit/${this.id}`)
    }
    clickChangePassword() {
        this.router.navigateByUrl(`/profile/change-password/${this.id}`)
    }


    ngOnDestroy(): void {
        this.postsSubscribtion?.unsubscribe()
        this.userSubscribtion?.unsubscribe()
        this.totalEventSubscribtion?.unsubscribe()
        this.totalCourseSubscribtion?.unsubscribe()
        this.totalIncomeSubscribtion?.unsubscribe()
    }
}