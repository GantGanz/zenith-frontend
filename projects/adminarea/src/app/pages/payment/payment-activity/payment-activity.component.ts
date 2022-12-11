import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ConfirmationService, LazyLoadEvent } from "primeng/api";
import { PaymentActivityData } from "projects/interface/payment-activity/payment-activity-data";
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
    unapprovedPaymentActivtiesRes!: PaymentActivityData[]
    approvedPaymentActivtiesRes!: PaymentActivityData[]
    rejectedPaymentActivtiesRes!: PaymentActivityData[]


    limit = this.rows
    totalApprovedPaymentActivities!: number
    totalUnapprovedPaymentActivities!: number
    totalRejectedPaymentActivities!: number

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

    constructor(private confirmationService: ConfirmationService, private paymentActivityService: PaymentActivityService,
        private fb: FormBuilder, private title: Title) {
        this.title.setTitle('Payment Activity | Zenith')
    }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paymentUnapprovedSubscription = this.paymentActivityService.getAllUnapproved(this.first, this.limit).subscribe(result => {
            this.unapprovedPaymentActivtiesRes = result.data
        })
        this.paymentApprovedSubscription = this.paymentActivityService.getAllApproved(this.first, this.limit).subscribe(result => {
            this.approvedPaymentActivtiesRes = result.data
        })
        this.paymentRejectedSubscription = this.paymentActivityService.getAllRejected(this.first, this.limit).subscribe(result => {
            this.rejectedPaymentActivtiesRes = result.data
        })
        this.countUnapprovedSubscription = this.paymentActivityService.countAllUnapproved().subscribe(result => {
            this.totalUnapprovedPaymentActivities = result
        })
        this.countApprovedSubscription = this.paymentActivityService.countAllApproved().subscribe(result => {
            this.totalApprovedPaymentActivities = result
        })
        this.countRejectedSubscription = this.paymentActivityService.countAllRejected().subscribe(result => {
            this.totalRejectedPaymentActivities = result
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
                this.paymentUpdate.controls['id'].setValue(this.unapprovedPaymentActivtiesRes[i].id)
                this.paymentUpdate.controls['version'].setValue(this.unapprovedPaymentActivtiesRes[i].version)
                this.approveSubscription = this.paymentActivityService.approve(this.paymentUpdate.value).subscribe(() => {
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
                this.paymentUpdate.controls['id'].setValue(this.unapprovedPaymentActivtiesRes[i].id)
                this.paymentUpdate.controls['version'].setValue(this.unapprovedPaymentActivtiesRes[i].version)
                this.rejectSubscription = this.paymentActivityService.reject(this.paymentUpdate.value).subscribe(() => {
                    this.init()
                })
            }
        })
    }

    getUnapprovedData(offset: number, limit: number) {
        this.pageChangeUnapprovedSubscription = this.paymentActivityService.getAllUnapproved(offset, limit).subscribe(result => {
            this.unapprovedPaymentActivtiesRes = result.data
        })
    }

    loadUnapprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getUnapprovedData(event.first!, event.rows!)
    }

    getApprovedData(offset: number, limit: number) {
        this.pageChangeApprovedSubscription = this.paymentActivityService.getAllApproved(offset, limit).subscribe(result => {
            this.approvedPaymentActivtiesRes = result.data
        })
    }

    loadApprovedData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getApprovedData(event.first!, event.rows!)
    }

    getRejectedData(offset: number, limit: number) {
        this.pageChangeRejectedSubscription = this.paymentActivityService.getAllRejected(offset, limit).subscribe(result => {
            this.rejectedPaymentActivtiesRes = result.data
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