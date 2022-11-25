import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { PaymentPremiumsRes } from "projects/interface/payment-premium/payment-premiums-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { PaymentPremiumService } from "projects/mainarea/src/app/service/payment-premium.service";
import { Subscription } from "rxjs";


@Component({
    selector: "payment-premium",
    templateUrl: "./payment-premium.component.html"
})
export class PaymentPremium implements OnInit, OnDestroy {
    fileLink = BASE_URL.FILE

    first = 0
    rows = 10
    position: string = 'top'
    unapprovedPaymentPremiumsRes!: PaymentPremiumsRes
    approvedPaymentPremiumsRes!: PaymentPremiumsRes


    limit = this.rows
    totalApprovedPaymentPremiums!: number
    totalUnapprovedPaymentPremiums!: number

    private paymentUnapprovedSubscription?: Subscription
    private paymentApprovedSubscription?: Subscription
    private pageChangeUnapprovedSubscription?: Subscription
    private pageChangeApprovedSubscription?: Subscription
    private countApprovedSubscription?: Subscription
    private countUnapprovedSubscription?: Subscription
    private approveSubscription?: Subscription

    paymentApprove = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]],
        isActive: [false]
    })

    constructor(private confirmationService: ConfirmationService, private paymentPremiumService: PaymentPremiumService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paymentUnapprovedSubscription = this.paymentPremiumService.getAllUnapproved(this.first, this.limit).subscribe(result => {
            this.unapprovedPaymentPremiumsRes = result
        })
        this.paymentApprovedSubscription = this.paymentPremiumService.getAllApproved(this.first, this.limit).subscribe(result => {
            this.approvedPaymentPremiumsRes = result
        })
        this.countUnapprovedSubscription = this.paymentPremiumService.countAllUnapproved().subscribe(result => {
            this.totalUnapprovedPaymentPremiums = result
        })
        this.countApprovedSubscription = this.paymentPremiumService.countAllApproved().subscribe(result => {
            this.totalApprovedPaymentPremiums = result
        })
    }

    clickConfirmApprove(index: number) {
        const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to approve this payment? (you can not undo this action)',
            header: 'Approve Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.paymentApprove.controls['id'].setValue(this.unapprovedPaymentPremiumsRes.data[i].id)
                this.paymentApprove.controls['version'].setValue(this.unapprovedPaymentPremiumsRes.data[i].version)
                this.approveSubscription = this.paymentPremiumService.approve(this.paymentApprove.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    getUnapprovedData(offset: number, limit: number) {
        this.pageChangeUnapprovedSubscription = this.paymentPremiumService.getAllUnapproved(offset, limit).subscribe(result => {
            this.unapprovedPaymentPremiumsRes = result
        })
    }

    loadUnapprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getUnapprovedData(event.first!, event.rows!)
    }

    getApprovedData(offset: number, limit: number) {
        this.pageChangeApprovedSubscription = this.paymentPremiumService.getAllApproved(offset, limit).subscribe(result => {
            this.approvedPaymentPremiumsRes = result
        })
    }

    loadApprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getApprovedData(event.first!, event.rows!)
    }

    ngOnDestroy(): void {
        this.pageChangeUnapprovedSubscription?.unsubscribe()
        this.pageChangeApprovedSubscription?.unsubscribe()
        this.paymentUnapprovedSubscription?.unsubscribe()
        this.paymentApprovedSubscription?.unsubscribe()
        this.countUnapprovedSubscription?.unsubscribe()
        this.countApprovedSubscription?.unsubscribe()
        this.approveSubscription?.unsubscribe()
    }
}