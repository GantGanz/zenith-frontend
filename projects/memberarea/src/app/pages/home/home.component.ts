import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";


@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})

export class HomeComponent {

    items!: MenuItem[]
    type!: string

    like = true
    bookmark = true
    likeFill = false
    bookmarkFill = false
    allComment = false
    commentPost = false
    viewComment = true
    hideComment = false

    showForm = false
    showUploadImg = false
    showCreatePolling = false

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this.items = [
            { label: 'Post', routerLink: '/feed/post' },
            { label: 'Likes', routerLink: '/feed/likes' },
            { label: 'Bookmark', routerLink: '/feed/bookmarks' }
        ]

        this.activatedRoute.params.subscribe(result => {
            this.type = result['type']
            this.init()
        })
    }

    showCreatePostDialog() {
        this.showForm = true
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

    }
    clickCreatePoll() {
        this.showCreatePolling = true
        this.showUploadImg = false
    }

    init() { }
}