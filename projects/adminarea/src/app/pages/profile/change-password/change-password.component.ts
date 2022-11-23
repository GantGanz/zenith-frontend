import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
    selector: "change-password",
    templateUrl: "change-password.component.html"
})
export class ChangePasswordComponent implements OnInit {

    backToProfileSuperAdmin = false
    backToProfileAdmin = false

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (this.router.url == "/super-admin/profiles/change-password") {
            this.backToProfileSuperAdmin = true
        }
        else if (this.router.url == "/admin/profiles/change-password") {
            this.backToProfileAdmin = true
        }
    }
}