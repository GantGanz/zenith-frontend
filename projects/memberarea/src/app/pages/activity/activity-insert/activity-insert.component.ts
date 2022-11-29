import { formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivityTypesRes } from "projects/interface/activity-type/activity-types-res";
import { ActivityTypeService } from "projects/mainarea/src/app/service/activity-type.service";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { Subscription } from "rxjs";

@Component({
    selector: "activity-insert",
    templateUrl: "./activity-insert.component.html"
})
export class ActivityInsertComponent implements OnInit, OnDestroy {

    private activitySubscription?: Subscription
    private activityTypesSubscription?: Subscription
    activityTypesRes!: ActivityTypesRes
    activityTypes: any[] = []

    activityForm = this.fb.group({
        activityTitle: [null, [Validators.required]],
        activityLocation: [null, [Validators.required]],
        provider: [null, [Validators.required]],
        startAt: ['', [Validators.required]],
        endAt: ['', [Validators.required]],
        fee: [null, [Validators.required]],
        activityTypeId: [null, [Validators.required]],
        attachmentActivityInsertReqs: this.fb.array([])
    })

    constructor(private activityService: ActivityService, private activityTypeService: ActivityTypeService, private fb: FormBuilder,
        private router: Router, private fileService: FileService) { }

    ngOnInit(): void {
        this.activityTypesSubscription = this.activityTypeService.getAll().subscribe(result => {
            this.activityTypesRes = result
            for (let i = 0; i < this.activityTypesRes.data.length; i++) {
                this.activityTypes.push({
                    name: this.activityTypesRes.data[i].activityTypeName,
                    code: this.activityTypesRes.data[i].activityTypeCode,
                    id: this.activityTypesRes.data[i].id
                })
            }
        })
    }

    clickSubmit() {
        let formattedStart = formatDate(this.activityForm.value.startAt!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en')
        this.activityForm.value.startAt = formattedStart
        let formattedEnd = formatDate(this.activityForm.value.endAt!, `yyyy-MM-dd'T'HH:mm:ss.SSS${getTimeZone()}`, 'en')
        this.activityForm.value.endAt = formattedEnd
        this.activitySubscription = this.activityService.insert(this.activityForm.value).subscribe(() => {
            this.router.navigateByUrl('/my-activity')
        })
    }
    get detailFoto(): FormArray {
        return this.activityForm.get('attachmentActivityInsertReqs') as FormArray
    }

    fileUpload(event: any) {
        this.fileService.fileUploadMulti(event).then(result => {
            this.detailFoto.push(this.fb.group({ extensions: result[0][0], fileCodes: result[0][1] }));
        })
    }

    ngOnDestroy(): void {
        this.activitySubscription?.unsubscribe()
        this.activityTypesSubscription?.unsubscribe()
    }
}

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}