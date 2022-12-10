import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ActivityData } from "projects/interface/activity/activity-data";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "payment-activity",
    templateUrl: "./payment-activity.component.html"
})
export class PaymentActivityComponent implements OnInit, OnDestroy {
    paymentStatus = 1

    private paymentActivitySubscription?: Subscription
    private paidSubscription?: Subscription
    private activitySubscription?: Subscription
    private paramSubscription?: Subscription

    paymentActivityForm: any = this.fb.group({
        fileCodes: ['', [Validators.required]],
        extensions: ['', [Validators.required]]
    })

    activity!: ActivityData

    activityId = ''
    activityTitle = ''
    provider = ''
    fee = 0
    loading = false

    constructor(private active: ActivatedRoute, private paymentActivityService: PaymentActivityService, private fb: FormBuilder, private fileService: FileService, private activityService: ActivityService,
        private title:Title) { 
            this.title.setTitle('Activity Payment | Zenith')
        }

    ngOnInit(): void {
        this.init()
    }

    init() {
        let isActivity = false
        let isPaid = false
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.activitySubscription = this.activityService.getById(id).subscribe(result => {
                this.activityId = result.data.id
                this.activityTitle = result.data.activityTitle
                this.provider = result.data.provider
                this.fee = result.data.fee

                this.paidSubscription = this.paymentActivityService.checkPaid(result.data.id).subscribe(resultPaid => {
                    isPaid = resultPaid
                    this.activitySubscription = this.paymentActivityService.checkApproved(result.data.id).subscribe(resultApproved => {
                        isActivity = resultApproved
                        if (isActivity) {
                            this.paymentStatus = 5
                        } else if (isPaid) {
                            this.paymentStatus = 4
                        } else {
                            this.paymentStatus = 1
                        }
                    })
                })
            })
        })
    }

    clickUpgrade() {
        this.paymentStatus = 2
    }

    clickCheckout() {
        this.paymentStatus = 3
    }

    clickSubmit() {
        this.loading = true
        this.paymentActivityForm.addControl('activityId', this.fb.control(this.activityId))
        this.paymentActivityForm.addControl('nominal', this.fb.control(this.fee))
        this.paymentActivitySubscription = this.paymentActivityService.insert(this.paymentActivityForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => this.paymentStatus = 4)
    }

    fileUpload(event: any) {
        this.fileService.fileUpload(event).then(result => {
            this.paymentActivityForm.controls['extensions'].setValue(result[0])
            this.paymentActivityForm.controls['fileCodes'].setValue(result[1])
        })
    }

    ngOnDestroy(): void {
        this.paymentActivitySubscription?.unsubscribe()
        this.activitySubscription?.unsubscribe()
        this.paidSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
    }
}
