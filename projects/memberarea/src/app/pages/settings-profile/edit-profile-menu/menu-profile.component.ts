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

    myId!: string


    private userSubscription?: Subscription

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.myId = result.data.id
        })

    }
    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }


    editProfile() {
        this.router.navigateByUrl(`/profile/edit/${this.myId}`)
    }

    changePassword() {
        this.router.navigateByUrl(`/profile/change-password/${this.myId}`)
    }
}