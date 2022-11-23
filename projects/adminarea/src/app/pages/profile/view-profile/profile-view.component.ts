import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "profile-view",
    templateUrl: "./profile-view.component.html"
})
export class ProfileViewComponent implements OnInit {

    editProfileSuperAdmin = false
    editProfileAdmin = false
    changePasswordSuperAdmin = false
    changePasswordAdmin = false

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (this.router.url == "/super-admin/profiles/view") {
            this.editProfileSuperAdmin = true
            this.changePasswordSuperAdmin = true
        } else if (this.router.url == "/admin/profiles/view") {
            this.editProfileAdmin = true
            this.changePasswordAdmin = true
        }
    }
}