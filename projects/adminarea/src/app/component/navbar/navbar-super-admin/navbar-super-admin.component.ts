import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "navbar-super-admin",
    templateUrl: "./navbar-super-admin.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class NavbarSuperAdminComponent implements OnInit, OnDestroy {

    private userSubscription?: Subscription

    fileLink = BASE_URL.FILE
    fileId!: string

    imgLoad:boolean =false

    constructor(private apiService: ApiService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        // this.fileId = this.apiService.getPhoto()!
        this.userSubscription = this.userService.getByPrincipal().pipe(finalize(()=>this.imgLoad =true)).subscribe(result => {
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