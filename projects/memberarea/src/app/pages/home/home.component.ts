import { Component } from "@angular/core";


@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})

export class HomeComponent {
    like = true
    bookmark = true
    likeFill = false
    bookmarkFill = false
    viewcomment = false
    commentPost = false

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
        this.viewcomment = true
    }

    clickCommentPost() {
        this.commentPost = true
    }
}