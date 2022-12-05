import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html"
})
export class ProfileViewComponent implements OnInit, OnDestroy {

    editProfileSuperAdmin = false
    editProfileAdmin = false
    changePasswordSuperAdmin = false
    changePasswordAdmin = false

    fileLink = BASE_URL.FILE
    fileId!: string
    myId!: string
    fullname!: string
    email!: string

    userLoaded = false

    private userSubscription?: Subscription

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().pipe(finalize(() => this.userLoaded = true)).subscribe(result => {
            this.fileId = result.data.fileId
            this.fullname = result.data.fullname
            this.myId = result.data.id
            this.email = result.data.email
        })

        if (this.router.url == "/profiles/super-admin/view") {
            this.editProfileSuperAdmin = true
            this.changePasswordSuperAdmin = true

        } else if (this.router.url == "/profiles/admin/view") {
            this.editProfileAdmin = true
            this.changePasswordAdmin = true
        }

    }
    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }
}