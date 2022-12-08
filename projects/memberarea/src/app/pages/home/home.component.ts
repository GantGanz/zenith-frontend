import { formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { FileUpload } from "primeng/fileupload";
import { PostData } from "projects/interface/post/post-data";
import { UserData } from "projects/interface/user/user-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { BookmarkService } from "projects/mainarea/src/app/service/bookmark.service";
import { CommentService } from "projects/mainarea/src/app/service/comment.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { LikeService } from "projects/mainarea/src/app/service/like.service";
import { PollVoteService } from "projects/mainarea/src/app/service/poll-vote.service";
import { PostTypeService } from "projects/mainarea/src/app/service/post-type.service";
import { PostService } from "projects/mainarea/src/app/service/post.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { finalize, Subscription } from "rxjs";
import { POST_TYPE_CODE } from "../../constant/post.type";


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["../../../styles.css"]
})

export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('uploadComponent') upload!: FileUpload

    fileLink = BASE_URL.FILE
    myFileId!: string

    type!: string

    uploaded = false

    result: PostData[] = []
    likedPost: PostData[] = []
    myUserId = ""
    myUserIsPremium = false

    tabIndex = 0
    postLoading = false
    loadingImg = false

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
    premiumDialog = false

    showForm = false
    showUploadImg = true
    showCreatePolling = false

    dataEmpty = true
    dataNotEmpty = false

    myComment = true
    editComment = false

    displayCustom!: boolean;
    activeIndex: number = 0;

    postTypeId!: string
    regularPostCode = POST_TYPE_CODE.REGULAR
    pollPostCode = POST_TYPE_CODE.POLLING
    premiumPostCode = POST_TYPE_CODE.PREMIUM

    first = 0
    limit = 3
    fileLoading = false

    postCount = 0

    commentFirst = 0
    commentLimit = 3

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

    private postInsertSubscription?: Subscription
    private postsSubscribtion?: Subscription
    private likedPostSubscription?: Subscription
    private postTypeSubscription?: Subscription
    private bookmarkedPostSubscription?: Subscription
    private postCountSubscription?: Subscription

    private insertVoteSubscription?: Subscription

    private insertLikeSubscription?: Subscription
    private deleteLikeSubscription?: Subscription
    private likedIdSubscription?: Subscription

    private insertBookmarkSubscription?: Subscription
    private deleteBookmarkSubscription?: Subscription
    private bookmarkedIdSubscription?: Subscription

    private insertCommentSubscription?: Subscription
    private commentByPostSubscription?: Subscription

    private myUserSubscription?: Subscription

    constructor(private fb: FormBuilder,
        private fileService: FileService, private postService: PostService,
        private likeService: LikeService, private postTypeService: PostTypeService,
        private pollVoteService: PollVoteService, private bookmarkService: BookmarkService,
        private commentService: CommentService, private userService: UserService) { }

    ngOnInit(): void {
        this.myUserSubscription = this.userService.getByPrincipal().subscribe(user => {
            this.myUserId = user.data.id
            this.myUserIsPremium = user.data.isPremium
            this.myFileId = user.data.fileId
            this.loadingImg = true
            if (!user.data.isPremium) {
                this.postForm.get('isPremium')?.disable()
            }
        })
        this.postInit()
    }

    postInit() {
        this.postLoading = true
        this.result = []
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).pipe(finalize(() => this.postLoading = false)).subscribe(posts => {
            this.result = posts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
                this.result[i].showMoreComment = false
                this.result[i].commentOffset = 0
            }
        })
        this.postCountSubscription = this.postService.countAll().subscribe(count => {
            this.postCount = count
        })
    }

    likedInit() {
        this.likedPostSubscription = this.postService.getAllLiked(this.first, this.limit).subscribe(likedPosts => {
            this.result = likedPosts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
                this.result[i].showMoreComment = false
                this.result[i].commentOffset = 0
            }
        })
        this.postCountSubscription = this.postService.countLiked().subscribe(count => {
            this.postCount = count
            if (count > 0) {
                this.dataEmpty = false
                this.dataNotEmpty = true
            } else {
                this.dataEmpty = true
                this.dataNotEmpty = false
            }
        })
    }

    bookmarkedInit() {
        this.bookmarkedPostSubscription = this.postService.getAllBookmarked(this.first, this.limit).subscribe(bookmarkedPosts => {
            this.result = bookmarkedPosts.data
            for (let i = 0; i < this.result.length; i++) {
                this.result[i].commentStatus = false
                this.result[i].moreComment = false
                this.result[i].showImg = false
                this.result[i].showMoreComment = false
                this.result[i].commentOffset = 0
            }
        })
        this.postCountSubscription = this.postService.countBookmarked().subscribe(count => {
            this.postCount = count
            if (count > 0) {
                this.dataEmpty = false
                this.dataNotEmpty = true
            } else {
                this.dataEmpty = true
                this.dataNotEmpty = false
            }
        })
    }

    clickTab(event: any) {
        this.first = 0
        this.tabIndex = event.index
        if (this.tabIndex == 0) {
            this.postInit()
        } else if (this.tabIndex == 1) {
            this.likedInit()
        } else {
            this.bookmarkedInit()
        }
    }

    clickEditComment(postIndex: number, commentIndex: number) {
        this.editComment = true
        this.myComment = false
    }

    onScroll() {
        this.first += this.limit
        if (this.result.length < this.postCount) {
            if (this.tabIndex == 0) {
                this.addData()
            } else if (this.tabIndex == 1) {
                this.addDataLiked()
            } else {
                this.addDataBookmarked()
            }
        }
    }

    addData() {
        this.postLoading = true
        this.postsSubscribtion = this.postService.getAll(this.first, this.limit).pipe(finalize(() => this.postLoading = false)).subscribe(posts => {
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
        this.postsSubscribtion = this.postService.getAllLiked(this.first, this.limit).subscribe(posts => {
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
        this.postsSubscribtion = this.postService.getAllBookmarked(this.first, this.limit).subscribe(posts => {
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

    showCreatePostDialog() {
        this.postForm.reset()
        this.showForm = true
        this.postTypeSubscription = this.postTypeService.getIdByCode(POST_TYPE_CODE.REGULAR).subscribe(result => {
            this.postTypeId = result.id
        })
    }

    clickSave(i: number) {
        this.bookmarkForm.controls['postId'].setValue(this.result[i].id)
        this.insertBookmarkSubscription = this.bookmarkService.insert(this.bookmarkForm.value).subscribe(() => {
            this.result[i].isBookmarked = true
        })
    }

    clickLike(i: number) {
        this.likeForm.controls['postId'].setValue(this.result[i].id)
        this.insertLikeSubscription = this.likeService.insert(this.likeForm.value).subscribe(() => {
            this.result[i].isLiked = true
            this.result[i].countLike += 1
        })
    }

    clickVote(i: number, pollIndex: number) {
        this.voteForm.controls['pollOptionId'].setValue(this.result[i].pollData.pollOptionDatas[pollIndex].id)

        this.insertVoteSubscription = this.pollVoteService.insert(this.voteForm.value).subscribe(() => {
            this.result[i].pollData.isVoted = true
            this.result[i].pollData.countVote += 1
            this.result[i].pollData.pollOptionDatas[pollIndex].isVoted = true
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

    clickUnLike(i: number) {
        this.likedIdSubscription = this.likeService.getId(this.result[i].id).subscribe(data => {
            this.deleteLikeSubscription = this.likeService.delete(data.id).subscribe(() => {
                this.result[i].isLiked = false
                this.result[i].countLike -= 1
                this.postCount -= 1
                if (this.tabIndex == 1) {
                    this.result.splice(i, 1)
                }
                if (this.postCount > 0) {
                    this.dataEmpty = false
                    this.dataNotEmpty = true
                } else {
                    this.dataEmpty = true
                    this.dataNotEmpty = false
                }
            })
        })
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

    get pollTitle() {
        return this.postForm.get('pollInsertReq')?.get('pollTitle')
    }

    selectFile(event: any) {
        console.log(event.currentFiles);
        if (event.currentFiles) {
            this.uploaded = true
        }
    }

    fileUpload(event: any) {
        this.detailFoto.clear()
        this.uploaded = false
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
                this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
                    this.showForm = false
                    this.first = 0
                    this.postInit()
                    this.upload.clear()
                })
            })
        } else {
            this.postInsertSubscription = this.postService.insert(this.postForm.value).subscribe(() => {
                this.showForm = false
                this.first = 0
                this.postInit()
                this.upload.clear()
            })
        }
    }

    submitcomment(postIndex: number) {
        this.commentForm.controls['postId'].setValue(this.result[postIndex].id)
        this.insertCommentSubscription = this.commentService.insert(this.commentForm.value).subscribe(() => {
            this.clickSeeComment(postIndex)
            this.result[postIndex].countComment += 1
            this.commentForm.reset()
        })
    }

    submitEditComment(postIndex: number, commentIndex: number) {
        //TODO pasang submit edit
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

    clickConfirmDelete(index: number) {
        //TODO pasang modal buat hapus post
    }

    clickConfirmDeleteComment(postIndex: number, commentIndex: number) {
        //TODO pasang modal buat hapus comment
    }

    cancelEdit(postIndex: number, commentIndex: number){

    }

    showPremiumDoalog() {
        this.premiumDialog = true
    }

    isExpired(date: string) {
        const now = new Date();
        now.setHours(now.getHours() + 7)
        const nowString = now.toISOString()
        return date < nowString
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
        this.insertCommentSubscription?.unsubscribe()
        this.commentByPostSubscription?.unsubscribe()
        this.myUserSubscription?.unsubscribe()
        this.postCountSubscription?.unsubscribe()
    }
}

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}