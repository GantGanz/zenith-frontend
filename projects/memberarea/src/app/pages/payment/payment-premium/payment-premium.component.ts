import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { PaymentPremiumService } from "projects/mainarea/src/app/service/payment-premium.service";
import { finalize, Subscription } from "rxjs";
import { PREMIUM_PRICE } from "../../../constant/premium.price";


@Component({
    selector: "upgrade-premium",
    templateUrl: "./payment-premium.component.html",
})
export class PaymentPremiumComponent implements OnInit, OnDestroy {
    premiumStatus = 0
    price = `${PREMIUM_PRICE}`
    loading = false

    private paymentPremiumSubscription?: Subscription
    private premiumSubscription?: Subscription
    private paidSubscription?: Subscription

    paymentPremiumForm = this.fb.group({
        fileCodes: ['', [Validators.required]],
        extensions: ['', [Validators.required]]
    })

    constructor(private paymentPremiumService: PaymentPremiumService, private fb: FormBuilder, private fileService: FileService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        let isPremium = false
        let isPaid = false
        this.paidSubscription = this.paymentPremiumService.checkPaid().subscribe(result => {
            isPaid = result
            this.premiumSubscription = this.paymentPremiumService.checkPremium().subscribe(result => {
                isPremium = result
                if (isPremium) {
                    this.premiumStatus = 5
                } else if (isPaid) {
                    this.premiumStatus = 4
                } else {
                    this.premiumStatus = 1
                }
            })
        })
    }

    clickUpgrade() {
        this.premiumStatus = 2
    }

    clickCheckout() {
        this.premiumStatus = 3
    }

    clickSubmit() {
        this.loading = true
        this.paymentPremiumSubscription = this.paymentPremiumService.insert(this.paymentPremiumForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => this.premiumStatus = 4)
    }

    fileUpload(event: any) {
        this.fileService.fileUpload(event).then(result => {
            this.paymentPremiumForm.controls['extensions'].setValue(result[0])
            this.paymentPremiumForm.controls['fileCodes'].setValue(result[1])
        })
    }

    ngOnDestroy(): void {
        this.paymentPremiumSubscription?.unsubscribe()
        this.premiumSubscription?.unsubscribe()
        this.paidSubscription?.unsubscribe()
    }
}
