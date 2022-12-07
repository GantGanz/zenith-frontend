import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ActivityTypeData } from "projects/interface/activity-type/activity-type-data";
import { ActivityData } from "projects/interface/activity/activity-data";
import { ActivityTypeService } from "projects/mainarea/src/app/service/activity-type.service";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { Subscription } from "rxjs";

@Component({
    selector: "my-activity-update",
    templateUrl: "./my-activity-update.component.html"
})
export class MyActivityUpdateComponent implements OnInit, OnDestroy {

    activityUpdateForm = this.fb.group({
        id: ['', [Validators.required]],
        activityTitle: ['', [Validators.required]],
        activityLocation: ['', [Validators.required]],
        provider: ['', [Validators.required]],
        startAt: ['', [Validators.required]],
        endAt: ['', [Validators.required]],
        fee: [0, [Validators.required]],
        activityTypeId: ['', [Validators.required]],
        isActive: [true],
        version: [0, [Validators.required]]
    })

    activityTypes: ActivityTypeData[] = []
    disable = false

    activityRes!: ActivityData

    private activityTypeSubscription?: Subscription
    private paramSubscription?: Subscription
    private myActivitySubscription?: Subscription
    private updateSubscription?: Subscription

    constructor(private activityService: ActivityService, private active: ActivatedRoute,
        private fb: FormBuilder, private activityTypeService: ActivityTypeService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.myActivitySubscription = this.activityService.getById(id).subscribe(result => {
                this.activityUpdateForm.patchValue(result.data)
                this.activityRes = result.data
                this.activityUpdateForm.controls['activityTypeId'].disable()
                this.activityUpdateForm.controls['fee'].disable()
                this.activityUpdateForm.controls['startAt'].disable()
                this.activityUpdateForm.controls['endAt'].disable()
            })
            this.activityTypeSubscription = this.activityTypeService.getAll().subscribe(result => {
                this.activityTypes = result.data
            })
        })
    }

    clickUpdate() {
        this.activityUpdateForm.controls['activityTypeId'].enable()
        this.activityUpdateForm.controls['fee'].enable()
        this.activityUpdateForm.controls['startAt'].enable()
        this.activityUpdateForm.controls['endAt'].enable()
        this.updateSubscription = this.activityService.update(this.activityUpdateForm.value).subscribe()
    }
    ngOnDestroy(): void {
        this.activityTypeSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
        this.myActivitySubscription?.unsubscribe()
    }
}