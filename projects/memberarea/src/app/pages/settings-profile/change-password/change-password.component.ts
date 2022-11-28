import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "change-password",
    templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent {

    constructor(private router: Router) { }

    clickBack() {
        this.router.navigateByUrl("/profile")
    }
}