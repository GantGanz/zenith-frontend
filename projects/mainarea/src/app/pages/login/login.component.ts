import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit {

    memberLogin = true

    constructor(private router: Router) { }

    ngOnInit(): void {
        if (this.router.url == "/admin/login")
            this.memberLogin = false
    }
}