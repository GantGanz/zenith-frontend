import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "profile-detail",
    templateUrl: "./profile-detail.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class ProfileDetailComponent {

    profileDetail = true

    constructor(private router: Router) { }


    clickEditProfile() {
        this.router.navigateByUrl("/profile/edit/:id")
        this.profileDetail = false
    }
}