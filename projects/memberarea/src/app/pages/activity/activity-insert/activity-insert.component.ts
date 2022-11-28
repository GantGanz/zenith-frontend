import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { FileService } from "projects/mainarea/src/app/service/file.service";
import { Subscription } from "rxjs";

@Component({
    selector: "activity-insert",
    templateUrl: "./activity-insert.component.html"
})
export class ActivityInsertComponent implements OnInit, OnDestroy {

    activityType: any = [
        { name: "event" },
        { name: "course" }
    ]

    private activitySubscription?: Subscription

    activityForm = this.fb.group({
        activityTitle: [null, [Validators.required]],
        activityContent: [null, [Validators.required]],
        attachmentactivityInsertReqs: this.fb.array([])
    })

    constructor(private activityService: ActivityService, private fb: FormBuilder,
        private router: Router, private fileService: FileService) { }

    ngOnInit(): void {

    }

    clickSubmit() {
        this.activitySubscription = this.activityService.insert(this.activityForm.value).subscribe(() => {
            this.router.navigateByUrl('/activitys/list')
        })
    }
    get detailFoto(): FormArray {
        return this.activityForm.get('attachmentactivityInsertReqs') as FormArray
    }

    fileUpload(event: any) {
        this.fileService.fileUploadMulti(event).then(result => {
            this.detailFoto.push(this.fb.group({ extensions: result[0][0], fileCodes: result[0][1] }));
            console.log(this.activityForm.value);

        })
    }

    ngOnDestroy(): void {
        this.activitySubscription?.unsubscribe()
    }
}
