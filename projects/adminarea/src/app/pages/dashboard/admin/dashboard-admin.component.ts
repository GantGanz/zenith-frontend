import { Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { ArticleService } from "projects/mainarea/src/app/service/article.service";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { PaymentPremiumService } from "projects/mainarea/src/app/service/payment-premium.service";
import { Subscription } from "rxjs";

@Component({
    selector: "dashboard-admin",
    templateUrl: "dashboard-admin.component.html"
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
    totalArticle: number = 0
    totalPremium: number = 0
    totalActivity: number = 0
    fullname!: string

    private articleSubscription?: Subscription
    private premiumSubscription?: Subscription
    private activitySubscription?: Subscription

    constructor(private articleService: ArticleService, private paymentPremiumService: PaymentPremiumService, private paymentActivityService: PaymentActivityService, private apiService: ApiService) { }

    ngOnInit(): void {
        this.articleSubscription = this.articleService.countAllById().subscribe(result => {
            this.totalArticle = result
        })
        this.activitySubscription = this.paymentActivityService.countAllUnapproved().subscribe(result => {
            this.totalActivity = result
        })
        this.premiumSubscription = this.paymentPremiumService.countAllUnapproved().subscribe(result => {
            this.totalPremium = result
        })
        this.fullname = this.apiService.getFullName()!
    }

    ngOnDestroy(): void {
        this.articleSubscription?.unsubscribe()
        this.activitySubscription?.unsubscribe()
        this.premiumSubscription?.unsubscribe()
    }
}