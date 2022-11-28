import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "menu-profile",
    templateUrl: "./menu-profile.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class MenuProfileComponent {

    constructor(private router: Router) { }

    profileDetail() {
        this.router.navigateByUrl('/profile/edit/:id')
    }
    changePassword() {
        this.router.navigateByUrl('/profile/change-password')
    }
}