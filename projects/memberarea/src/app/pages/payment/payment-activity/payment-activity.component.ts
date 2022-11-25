import { Component } from "@angular/core";

@Component({
    selector: "payment-activity",
    templateUrl: "./payment-activity.component.html"
})
export class PaymentActivityComponent {
    paymentStep1 = true
    paymentStep2 = false
    paymentStep3 = false
    paymentStep4 = false

    clickPayNow() {
        this.paymentStep1 = false
        this.paymentStep2 = true
        this.paymentStep3 = false
        this.paymentStep4 = false
    }

    clickConfirmPayment() {
        this.paymentStep1 = false
        this.paymentStep2 = false
        this.paymentStep3 = true
        this.paymentStep4 = false
    }
    uploadProofPayment() {
        this.paymentStep1 = false
        this.paymentStep2 = false
        this.paymentStep3 = false
        this.paymentStep4 = true
    }
}