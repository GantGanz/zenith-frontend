import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "dashboard-super-admin",
    templateUrl: "dashboard-super-admin.component.html"
})
export class DashboardSuperAdminComponent implements OnInit, OnDestroy {
    totalMember: number = 0
    totalAdmin: number = 0
    totalPremium: number = 0

    private memberSubscription?: Subscription
    private adminSubscription?: Subscription
    private premiumSubscription?: Subscription

    myName!: string

    constructor(private userService: UserService, private apiService: ApiService, private title: Title) {
        this.title.setTitle('Dashboard Super Admin | Zenith')
    }

    ngOnInit(): void {
        this.memberSubscription = this.userService.countMember().subscribe(result => {
            this.totalMember = result
        })
        this.adminSubscription = this.userService.countAdmin().subscribe(result => {
            this.totalAdmin = result
        })
        this.premiumSubscription = this.userService.countPremium().subscribe(result => {
            this.totalPremium = result
        })
        this.myName = this.apiService.getFullName()!
    }

    ngOnDestroy(): void {
        this.memberSubscription?.unsubscribe()
        this.adminSubscription?.unsubscribe()
        this.premiumSubscription?.unsubscribe()
    }
}