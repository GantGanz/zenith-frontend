import { formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { BookmarkService } from "projects/mainarea/src/app/service/bookmark.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { LikeService } from "projects/mainarea/src/app/service/like.service";
import { PollVoteService } from "projects/mainarea/src/app/service/poll-vote.service";
import { PostTypeService } from "projects/mainarea/src/app/service/post-type.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { Subscription } from "rxjs";
import { POST_TYPE_CODE } from "../../constant/post.type";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})

export class HomeComponent implements OnInit, OnDestroy {


    fileLink = BASE_URL.FILE
    myFileId!: string

    type!: string

    result: any[] = []
    likedPost: any[] = []

    tabIndex = 0

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

    displayCustom!: boolean;
    activeIndex: number = 0;

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
                this.fb.group({ pollContent: ['', Validators.required] }),
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

    voteForm = this.fb.group({
        pollOptionId: ['', [Validators.required]]
    })

    bookmarkForm = this.fb.group({
        postId: ['', [Validators.required]]
    })

    private postInsertSubscription?: Subscription
    private postsSubscribtion?: Subscription
    private likedPostSubscription?: Subscription
    private postTypeSubscription?: Subscription
    private bookmarkedPostSubscription?: Subscription

    private insertVoteSubscription?: Subscription

    private insertLikeSubscription?: Subscription
    private deleteLikeSubscription?: Subscription
    private likedIdSubscription?: Subscription

    private insertBookmarkSubscription?: Subscription
    private deleteBookmarkSubscription?: Subscription
    private bookmarkedIdSubscription?: Subscription

    constructor(private fb: FormBuilder, private apiService: ApiService,
        private fileService: FileService, private postService: PostService,
        private likeService: LikeService, private postTypeService: PostTypeService,
        private pollVoteService: PollVoteService, private bookmarkService: BookmarkService) { }

    ngOnInit(): void {
        this.myFileId = this.apiService.getPhoto()!
        this.postInit()
    }

    postInit() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            this.result = posts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
            }
        })
    }

    likedInit() {
        console.log("liked");
        this.likedPostSubscription = this.postService.getAllLiked(this.first, this.limit).subscribe(likedPosts => {
            this.result = likedPosts.data
        })
    }

    bookmarkedInit() {
        console.log("bookmark");
        this.bookmarkedPostSubscription = this.postService.getAllBookmarked(this.first, this.limit).subscribe(bookmarkedPosts => {
            this.result = bookmarkedPosts.data
        })
    }

    clickTab(event: any) {
        this.first = 0
        this.tabIndex = event.index
        console.log(event.index);
        if (this.tabIndex == 0) {
            this.postInit()
        } else if (this.tabIndex == 1) {
            this.likedInit()
        } else {
            this.bookmarkedInit()
        }
    }

    onScroll() {
        this.first += this.limit
        if (this.tabIndex == 0) {
            this.addData()
        } else if (this.tabIndex == 1) {
            this.addDataLiked()
        } else {
            this.addDataBookmarked()
        }
    }

    addData() {
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
                this.result[i + this.first].commentStatus = false
                this.result[i + this.first].moreComment = false
                this.result[i + this.first].showImg = false
            }
            console.log(this.result);
        })
    }

    addDataLiked() {
        this.postsSubscribtion = this.postService.getAllLiked(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
            }
        })
    }

    addDataBookmarked() {
        this.postsSubscribtion = this.postService.getAllBookmarked(this.first, this.limit).subscribe(posts => {
            for (let i = 0; i < posts.data.length; i++) {
                this.result.push(posts.data[i])
            }
        })
    }

    showCreatePostDialog() {
        this.postForm.reset()
        this.showForm = true
        this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.REGULAR).subscribe(result => {
            this.postTypeId = result.id
        })
    }

    clickSave(i: number) {
        console.log("save");
        this.bookmarkForm.controls['postId'].setValue(this.result[i].id)
        this.insertBookmarkSubscription = this.bookmarkService.insert(this.bookmarkForm.value).subscribe(() => {
            this.result[i].isBookmarked = true
        })
    }

    clickLike(i: number) {
        console.log("insert");
        this.likeForm.controls['postId'].setValue(this.result[i].id)
        this.insertLikeSubscription = this.likeService.insert(this.likeForm.value).subscribe(() => {
            this.result[i].isLiked = true
            this.result[i].countLike += 1
        })
    }

    clickVote(i: number, pollIndex: number) {
        console.log(this.result[i].pollData.pollOptionDatas[pollIndex].id);
        this.voteForm.controls['pollOptionId'].setValue(this.result[i].pollData.pollOptionDatas[pollIndex].id)

        this.insertVoteSubscription = this.pollVoteService.insert(this.voteForm.value).subscribe(() => {
            this.result[i].pollData.isVoted = true
            this.result[i].pollData.countVote += 1
            this.result[i].pollData.pollOptionDatas[pollIndex].isVoted = true
        })
    }

    clickUnSave(i: number) {
        console.log("Unsave");
        this.bookmarkedIdSubscription = this.bookmarkService.getId(this.result[i].id).subscribe(data => {
            console.log(data.id);

            this.deleteBookmarkSubscription = this.bookmarkService.delete(data.id).subscribe(() => {
                this.result[i].isBookmarked = false
                if (this.tabIndex == 2) {
                    this.result.splice(i, 1)
                }
            })
        })
    }

    clickUnLike(i: number) {
        console.log("Unlike");
        this.likedIdSubscription = this.likeService.getId(this.result[i].id).subscribe(data => {
            console.log(data.id);
            this.deleteLikeSubscription = this.likeService.delete(data.id).subscribe(() => {
                this.result[i].isLiked = false
                this.result[i].countLike -= 1
                if (this.tabIndex == 1) {
                    this.result.splice(i, 1)
                }
            })
        })
    }

    clickMoreComment(index: number) {
        this.result[index].moreComment = true
        this.allComment = true
        this.viewComment = false
        this.hideComment = true
    }

    clickCloseComment(index: number) {
        this.result[index].moreComment = false
        this.allComment = false
        this.viewComment = true
        this.hideComment = false
    }

    clickCommentPost(postIndex: number) {
        this.result[postIndex].commentStatus = true
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
        this.detailFoto.clear()
        this.fileService.fileUploadMulti(event).then(result => {
            for (let i = 0; i < result.length; i++) {
                this.detailFoto.insert(i, this.fb.group({ extensions: result[i][0], fileCodes: result[i][1] }));
            }
        })
    }

    submitPost() {
        let formattedStart = formatDate(this.postForm.value.pollInsertReq!.endAt!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en')
        this.postForm.value.pollInsertReq!.endAt = formattedStart
        this.postForm.controls['postTypeId'].setValue(this.postTypeId)
        if (this.postForm.value.isPremium) {
            this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.PREMIUM).subscribe(result => {
                this.postForm.controls['postTypeId'].setValue(result.id)
            })
        }
        this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
            this.showForm = false
            this.first = 0
            this.postInit()
        })
    }

    addPoll() {
        this.pollingOption.push(this.fb.group({ pollContent: ['', [Validators.required]] }))
    }

    removePoll(i: number) {
        this.pollingOption.removeAt(i)
    }


    imageClick(index: number, indexPhoto: number) {
        this.activeIndex = indexPhoto;
        this.result[index].showImg = true
    }

    ngOnDestroy(): void {
        this.postInsertSubscription?.unsubscribe()
        this.postsSubscribtion?.unsubscribe()
        this.insertLikeSubscription?.unsubscribe()
        this.deleteLikeSubscription?.unsubscribe()
        this.likedIdSubscription?.unsubscribe()
        this.postTypeSubscription?.unsubscribe()
        this.insertVoteSubscription?.unsubscribe()
        this.likedPostSubscription?.unsubscribe()
        this.bookmarkedPostSubscription?.unsubscribe()
        this.insertBookmarkSubscription?.unsubscribe()
        this.deleteBookmarkSubscription?.unsubscribe()
        this.bookmarkedIdSubscription?.unsubscribe()
    }
}

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}