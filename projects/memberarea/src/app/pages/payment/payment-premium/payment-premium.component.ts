import { Component, OnDestroy, OnInit } from "@angular/core";
import { PaymentPremiumService } from "projects/mainarea/src/app/service/payment-premium.service";
import { Subscription } from "rxjs";


@Component({
    selector: "upgrade-premium",
    templateUrl: "./payment-premium.component.html",
})
export class PaymentPremiumComponent implements OnInit, OnDestroy {
    upgradePremiumStep1 = true
    upgradePremiumStep2 = false
    upgradePremiumStep3 = false
    upgradePremiumStep4 = false
    premiumStatus = false

    private premiumSubscription?: Subscription

    constructor(private paymentPremiumService: PaymentPremiumService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.premiumSubscription = this.paymentPremiumService.checkPremium().subscribe(result => {
            this.premiumStatus = result
        })
    }

    clickUpgrade() {
        this.upgradePremiumStep1 = false
        this.upgradePremiumStep2 = true
        this.upgradePremiumStep3 = false
        this.upgradePremiumStep4 = false
    }

    clickCheckout() {
        this.upgradePremiumStep1 = false
        this.upgradePremiumStep2 = false
        this.upgradePremiumStep3 = true
        this.upgradePremiumStep4 = false

    }
    clickConfirmPayment() {
        this.upgradePremiumStep1 = false
        this.upgradePremiumStep2 = false
        this.upgradePremiumStep3 = false
        this.upgradePremiumStep4 = true
    }

    ngOnDestroy(): void {
        this.premiumSubscription?.unsubscribe()
    }
}
