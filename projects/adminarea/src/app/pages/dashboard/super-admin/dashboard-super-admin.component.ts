import { Component, OnDestroy, OnInit } from "@angular/core";
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

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.memberSubscription = this.userService.countMember().subscribe(result=>{
            this.totalMember=result
        })
        this.adminSubscription = this.userService.countAdmin().subscribe(result=>{
            this.totalAdmin = result
        })
        this.premiumSubscription = this.userService.countPremium().subscribe(result=>{
            this.totalPremium = result
        })
    }
    
    ngOnDestroy(): void {
        this.memberSubscription?.unsubscribe()
        this.adminSubscription?.unsubscribe()
        this.premiumSubscription?.unsubscribe()
    }
}