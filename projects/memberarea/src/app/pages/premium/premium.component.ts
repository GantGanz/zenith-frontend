import { Component } from "@angular/core";


@Component({
    selector: "upgrade-premium",
    templateUrl: "./premium.component.html",
    styleUrls: ["premium.component.css"]
})
export class PremiumComponent {
    upgradePremiumStep1 = true
    upgradePremiumStep2 = false
    upgradePremiumStep3 = false
    upgradePremiumStep4 = false

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
}
