import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { PaymentActivitiesRes } from "projects/interface/payment-activity/payment-activities-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { Subscription } from "rxjs";


@Component({
    selector: "payment-activtiy",
    templateUrl: "./payment-activity.component.html"
})

export class PaymentActivity implements OnInit, OnDestroy {
    fileLink = BASE_URL.FILE

    first = 0
    rows = 10
    position: string = 'top'
    paymentActivtiyRes!: PaymentActivitiesRes


    limit = this.rows
    totalArticles!: number

    private paymentSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription
    private approveSubscription?: Subscription

    paymentApprove = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]],
        articleTitle: [''],
        articleContent: [''],
        isActive: [false]
    })

    constructor(private confirmationService: ConfirmationService, private paymentActivityService: PaymentActivityService, private fb: FormBuilder) { }

    ngOnInit(): void {
        // this.init()
    }

    // init() {
    //     this.paymentSubscription = this.paymentActivityService.getAllUnapproved(this.first, this.limit).subscribe(result => {
    //         this.paymentActivtiyRes = result
    //     })
    //     this.countSubscription = this.paymentActivityService.countAll().subscribe(result => {
    //         this.totalArticles = result
    //     })
    // }

    // clickConfirmDelete(index: number) {
    //     this.confirmationService.confirm({
    //         message: 'Do you want to delete this article?',
    //         header: 'Delete Confirmation',
    //         icon: 'pi pi-info-circle',
    //         key: 'positionDialog',
    //         accept: () => {
    //             this.paymentApprove.controls['id'].setValue(this.paymentActivtiyRes.data[index].id)
    //             this.paymentApprove.controls['version'].setValue(this.paymentActivtiyRes.data[index].version)
    //             this.paymentApprove.controls['articleTitle'].setValue(this.paymentActivtiyRes.data[index].articleTitle)
    //             this.paymentApprove.controls['articleContent'].setValue(this.paymentActivtiyRes.data[index].articleContent)
    //             this.approveSubscription = this.paymentActivityService.update(this.paymentApprove.value).subscribe(a => {
    //                 this.init()
    //             })
    //         }
    //     })
    // }

    // getData(offset: number, limit: number) {
    //     this.pageChangeSubscription = this.paymentActivityService.getAllById(offset, limit).subscribe(result => {
    //         this.paymentActivtiyRes = result
    //     })
    // }

    // loadData(event: LazyLoadEvent) {
    //     this.getData(event.first!, event.rows!)
    // }

    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.paymentSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
        this.approveSubscription?.unsubscribe()
    }
}