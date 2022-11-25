import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html"
})
export class ProfileViewComponent implements OnInit {

    editProfileSuperAdmin = false
    editProfileAdmin = false
    changePasswordSuperAdmin = false
    changePasswordAdmin = false

    fileLink= BASE_URL.FILE
    fileId!: string
    myId!: string

    constructor(private router: Router, private apiService:ApiService) { }

    ngOnInit(): void {
        if (this.router.url == "/super-admin/profiles/view") {
            this.editProfileSuperAdmin = true
            this.changePasswordSuperAdmin = true
        } else if (this.router.url == "/admin/profiles/view") {
            this.editProfileAdmin = true
            this.changePasswordAdmin = true
        }
        this.fileId = this.apiService.getPhoto()!
        this.myId = this.apiService.getId()
    }
}