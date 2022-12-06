import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { ActivitiesRes } from "projects/interface/activity/activities-res";
import { ActivityData } from "projects/interface/activity/activity-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { Subscription } from "rxjs";

@Component({
    selector: "my-activity",
    templateUrl: "./my-activity.component.html",
    styleUrls: ["../../../styles.css"]
})
export class MyActivityComponent implements OnInit, OnDestroy {

    dataCourses!: ActivityData[]
    dataEvents!: ActivityData[]
    position: string = 'top'

    activityRes!: ActivitiesRes

    activityDelete = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]],
        activityTitle: [''],
        activityLocation: [''],
        provider: [''],
        startAt: [''],
        endAt: [''],
        fee: [0],
        activityTypeId: [''],
        isActive: [false]
    })

    first = 0
    limit = 6

    fileLink = BASE_URL.FILE

    private activitySubscription?: Subscription
    private activityCoursesSubscription?: Subscription
    private activityEventsSubscription?: Subscription
    private deleteSubscription?: Subscription

    constructor(private activityService: ActivityService, private router: Router,
        private confirmationService: ConfirmationService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    onScroll() {
        this.first += this.limit
        this.addDataCourses()
        this.addDataEvents()
    }

    init() {
        this.activityCoursesSubscription = this.activityService.getAllCourseById(this.first, this.limit).subscribe(result => {
            this.dataCourses = result.data
            this.activityRes = result
        })
        this.activityEventsSubscription = this.activityService.getAllEventById(this.first, this.limit).subscribe(result => {
            this.dataEvents = result.data
            this.activityRes = result
        })
    }

    tabClick() {
        this.first = 0
        this.init()
    }

    addDataCourses() {
        this.activityCoursesSubscription = this.activityService.getAllCourse(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataCourses.push(result.data[i])
            }
        })
    }

    addDataEvents() {
        this.activityEventsSubscription = this.activityService.getAllEvent(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataEvents.push(result.data[i])
            }
        })
    }

    clickBack() {
        this.router.navigateByUrl("/profile")
    }

    isFuture(date: string) {
        const now = new Date();
        now.setHours(now.getHours() + 7)
        const nowString = now.toISOString()
        return date > nowString
    }

    clickConfirmDelete(i: number) {
        // const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to delete this activity?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: 'positionDialog',

            accept: () => {
                this.activityDelete.controls['id'].setValue(this.activityRes.data[i].id)
                this.activityDelete.controls['version'].setValue(this.activityRes.data[i].version)
                this.activityDelete.controls['activityTitle'].setValue(this.activityRes.data[i].activityTitle)
                this.activityDelete.controls['activityLocation'].setValue(this.activityRes.data[i].activityLocation)
                this.activityDelete.controls['provider'].setValue(this.activityRes.data[i].provider)
                this.activityDelete.controls['startAt'].setValue(this.activityRes.data[i].startAt)
                this.activityDelete.controls['endAt'].setValue(this.activityRes.data[i].endAt)
                this.activityDelete.controls['fee'].setValue(this.activityRes.data[i].fee)
                this.activityDelete.controls['activityTypeId'].setValue(this.activityRes.data[i].activityTypeId)

                this.deleteSubscription = this.activityService.update(this.activityDelete.value).subscribe(a => {
                    this.init()
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.activityCoursesSubscription?.unsubscribe()
        this.activityEventsSubscription?.unsubscribe()
        this.activitySubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}