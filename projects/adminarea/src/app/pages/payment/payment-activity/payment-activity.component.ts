import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { PaymentActivitiesRes } from "projects/interface/payment-activity/payment-activities-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { Subscription } from "rxjs";


@Component({
    selector: "payment-activtiy",
    templateUrl: "./payment-activity.component.html",
    styleUrls: ["../../../../styles.css"]
})

export class PaymentActivity implements OnInit, OnDestroy {
    fileLink = BASE_URL.FILE

    first = 0
    rows = 10
    position: string = 'top'
    unapprovedPaymentActivtiesRes!: PaymentActivitiesRes
    approvedPaymentActivtiesRes!: PaymentActivitiesRes


    limit = this.rows
    totalApprovedPaymentActivities!: number
    totalUnapprovedPaymentActivities!: number

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

    constructor(private confirmationService: ConfirmationService, private paymentActivityService: PaymentActivityService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paymentUnapprovedSubscription = this.paymentActivityService.getAllUnapproved(this.first, this.limit).subscribe(result => {
            this.unapprovedPaymentActivtiesRes = result
        })
        this.paymentApprovedSubscription = this.paymentActivityService.getAllApproved(this.first, this.limit).subscribe(result => {
            this.approvedPaymentActivtiesRes = result
        })
        this.countUnapprovedSubscription = this.paymentActivityService.countAllUnapproved().subscribe(result => {
            this.totalUnapprovedPaymentActivities = result
        })
        this.countApprovedSubscription = this.paymentActivityService.countAllApproved().subscribe(result => {
            this.totalApprovedPaymentActivities = result
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
                this.paymentApprove.controls['id'].setValue(this.unapprovedPaymentActivtiesRes.data[i].id)
                this.paymentApprove.controls['version'].setValue(this.unapprovedPaymentActivtiesRes.data[i].version)
                this.approveSubscription = this.paymentActivityService.approve(this.paymentApprove.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    getUnapprovedData(offset: number, limit: number) {
        this.pageChangeUnapprovedSubscription = this.paymentActivityService.getAllUnapproved(offset, limit).subscribe(result => {
            this.unapprovedPaymentActivtiesRes = result
        })
    }

    loadUnapprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getUnapprovedData(event.first!, event.rows!)
    }

    getApprovedData(offset: number, limit: number) {
        this.pageChangeApprovedSubscription = this.paymentActivityService.getAllApproved(offset, limit).subscribe(result => {
            this.approvedPaymentActivtiesRes = result
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