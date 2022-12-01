import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "navbar-admin",
    templateUrl: "./navbar-admin.component.html"
})
export class NavbarAdminComponent implements OnInit {

    fileLink = BASE_URL.FILE
    fileId!: string

    private userSubscription?: Subscription

    constructor(private apiService: ApiService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.fileId = result.data.fileId
        })
    }

    logout() {
        this.apiService.logout()
        this.router.navigateByUrl('/admin/login')
    }
    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }
}