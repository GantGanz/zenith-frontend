import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

    first = 0
    limit = 6

    fileLink = BASE_URL.FILE

    private activityCoursesSubscription?: Subscription
    private activityEventsSubscription?: Subscription

    constructor(private activityService: ActivityService, private router: Router) { }

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
        })
        this.activityEventsSubscription = this.activityService.getAllEventById(this.first, this.limit).subscribe(result => {
            this.dataEvents = result.data
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

    ngOnDestroy(): void {
        this.activityCoursesSubscription?.unsubscribe()
        this.activityEventsSubscription?.unsubscribe()
    }
}