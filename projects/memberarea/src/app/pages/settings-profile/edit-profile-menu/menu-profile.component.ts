import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "menu-profile",
    templateUrl: "./menu-profile.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class MenuProfileComponent {

    fileLink = BASE_URL.FILE
    fileId!: string
    myId!: string
    fullname!: string
    email!: string

    private userSubscription?: Subscription

    constructor(private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.fileId = result.data.fileId
            this.fullname = result.data.fullname
            this.myId = result.data.id
            this.email = result.data.email
        })

    }
    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }


    // constructor(private router: Router) { }

    // profileDetail() {
    //     this.router.navigateByUrl('/profile/edit/:id')
    // }

    // changePassword() {
    //     this.router.navigateByUrl('/profile/change-password/:id')
    // }
}