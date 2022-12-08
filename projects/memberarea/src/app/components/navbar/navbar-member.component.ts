import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { finalize, Subscription } from "rxjs";


@Component({
    selector: "navbar-member",
    templateUrl: "navbar-member.component.html",
    styleUrls: ["../../../styles.css"]
})

export class NavbarMemberComponent implements OnInit {

    fileLink = BASE_URL.FILE
    fileId!: string
    fullName!: string

    premiumStatus!: boolean

    fileLoading = false

    private userSubscription?: Subscription

    constructor(private apiService: ApiService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().pipe(finalize(() => this.fileLoading = true)).subscribe(result => {
            this.fileId = result.data.fileId
            this.premiumStatus = result.data.isPremium
        })
    }


    logout() {
        this.apiService.logout()
        this.router.navigateByUrl('/member/login')
    }

    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }


}