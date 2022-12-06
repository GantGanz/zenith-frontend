import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { PaymentPremiumData } from "projects/interface/payment-premium/payment-premium-data";
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
    unapprovedPaymentPremiumsRes!: PaymentPremiumData[]
    approvedPaymentPremiumsRes!: PaymentPremiumData[]
    rejectedPaymentPremiumsRes!: PaymentPremiumData[]


    limit = this.rows
    totalApprovedPaymentPremiums!: number
    totalUnapprovedPaymentPremiums!: number
    totalRejectedPaymentPremiums!: number

    private paymentUnapprovedSubscription?: Subscription
    private paymentApprovedSubscription?: Subscription
    private paymentRejectedSubscription?: Subscription
    private pageChangeUnapprovedSubscription?: Subscription
    private pageChangeApprovedSubscription?: Subscription
    private pageChangeRejectedSubscription?: Subscription
    private countApprovedSubscription?: Subscription
    private countUnapprovedSubscription?: Subscription
    private countRejectedSubscription?: Subscription
    private approveSubscription?: Subscription
    private rejectSubscription?: Subscription

    paymentUpdate = this.fb.group({
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
            this.unapprovedPaymentPremiumsRes = result.data
        })
        this.paymentApprovedSubscription = this.paymentPremiumService.getAllApproved(this.first, this.limit).subscribe(result => {
            this.approvedPaymentPremiumsRes = result.data
        })
        this.paymentRejectedSubscription = this.paymentPremiumService.getAllRejected(this.first, this.limit).subscribe(result => {
            this.rejectedPaymentPremiumsRes = result.data
        })
        this.countUnapprovedSubscription = this.paymentPremiumService.countAllUnapproved().subscribe(result => {
            this.totalUnapprovedPaymentPremiums = result
        })
        this.countApprovedSubscription = this.paymentPremiumService.countAllApproved().subscribe(result => {
            this.totalApprovedPaymentPremiums = result
        })
        this.countRejectedSubscription = this.paymentPremiumService.countAllRejected().subscribe(result => {
            this.totalRejectedPaymentPremiums = result
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
                this.paymentUpdate.controls['id'].setValue(this.unapprovedPaymentPremiumsRes[i].id)
                this.paymentUpdate.controls['version'].setValue(this.unapprovedPaymentPremiumsRes[i].version)
                this.approveSubscription = this.paymentPremiumService.approve(this.paymentUpdate.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    clickConfirmReject(index: number) {
        const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to reject this payment? (you can not undo this action)',
            header: 'Reject Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',
            accept: () => {
                this.paymentUpdate.controls['id'].setValue(this.unapprovedPaymentPremiumsRes[i].id)
                this.paymentUpdate.controls['version'].setValue(this.unapprovedPaymentPremiumsRes[i].version)
                this.approveSubscription = this.paymentPremiumService.reject(this.paymentUpdate.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    getUnapprovedData(offset: number, limit: number) {
        this.pageChangeUnapprovedSubscription = this.paymentPremiumService.getAllUnapproved(offset, limit).subscribe(result => {
            this.unapprovedPaymentPremiumsRes = result.data
        })
    }

    loadUnapprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getUnapprovedData(event.first!, event.rows!)
    }

    getApprovedData(offset: number, limit: number) {
        this.pageChangeApprovedSubscription = this.paymentPremiumService.getAllApproved(offset, limit).subscribe(result => {
            this.approvedPaymentPremiumsRes = result.data
        })
    }

    loadApprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getApprovedData(event.first!, event.rows!)
    }

    getRejectedData(offset: number, limit: number) {
        this.pageChangeRejectedSubscription = this.paymentPremiumService.getAllRejected(offset, limit).subscribe(result => {
            this.rejectedPaymentPremiumsRes = result.data
        })
    }

    loadRejectedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getRejectedData(event.first!, event.rows!)
    }

    ngOnDestroy(): void {
        this.pageChangeUnapprovedSubscription?.unsubscribe()
        this.pageChangeApprovedSubscription?.unsubscribe()
        this.pageChangeRejectedSubscription?.unsubscribe()
        this.paymentUnapprovedSubscription?.unsubscribe()
        this.paymentApprovedSubscription?.unsubscribe()
        this.paymentRejectedSubscription?.unsubscribe()
        this.countUnapprovedSubscription?.unsubscribe()
        this.countApprovedSubscription?.unsubscribe()
        this.countRejectedSubscription?.unsubscribe()
        this.approveSubscription?.unsubscribe()
        this.rejectSubscription?.unsubscribe()
    }
}