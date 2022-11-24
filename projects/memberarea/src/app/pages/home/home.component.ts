import { Component } from "@angular/core";


@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})

export class HomeComponent {
    like = true
    bookmark = true
    likeFill = false
    bookmarkFill = false
    allComment = false
    commentPost = false
    viewComment = true
    hideComment = false


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
}