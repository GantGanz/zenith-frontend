import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
        activityTitle: ['', [Validators.required, Validators.maxLength(50)]],
        activityLocation: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
        provider: ['', [Validators.required]],
        startAt: ['', [Validators.required]],
        endAt: ['', [Validators.required]],
        fee: ['', [Validators.required]],
        activityTypeId: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    activityTypes: any[] = []


    private activityTypeSubscription?: Subscription
    private paramSubscription?: Subscription
    private myActivitySubscription?: Subscription
    private updateSubscription?: Subscription

    constructor(private activityService: ActivityService, private active: ActivatedRoute,
        private fb: FormBuilder, private activityTypeService: ActivityTypeService) { }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.myActivitySubscription = this.activityService.getById(id).subscribe(result => {
                this.activityUpdateForm.controls['id'].setValue(result.data.id)
                this.activityUpdateForm.controls['activityTitle'].setValue(result.data.activityTitle)
                this.activityUpdateForm.controls['activityLocation'].setValue(result.data.activityLocation)
                this.activityUpdateForm.controls['provider'].setValue(result.data.provider)
                this.activityUpdateForm.controls['startAt'].setValue(result.data.startAt)
                this.activityUpdateForm.controls['endAt'].setValue(result.data.endAt)
                this.activityUpdateForm.controls['isActive'].setValue(result.data.isActive)
                this.activityUpdateForm.controls['version'].setValue(result.data.version)

            })
            this.activityTypeSubscription = this.activityTypeService.getAll().subscribe(result => {
                for (let i = 0; i < result.data.length; i++) {
                    this.activityTypes.push({
                        name: result.data[i].activityTypeCode,
                        code: result.data[i].activityTypeName,
                        id: result.data[i].id
                    })
                }
            })
        })
    }

    clickUpdate() {
        this.updateSubscription = this.activityService.update(this.activityUpdateForm.value).subscribe()
    }
    ngOnDestroy(): void {
        this.activityTypeSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
        this.myActivitySubscription?.unsubscribe()
    }
}