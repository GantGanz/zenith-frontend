import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActivityData } from "projects/interface/activity/activity-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { PaymentActivityService } from "projects/mainarea/src/app/service/payment-activity.service";
import { Subscription } from "rxjs";
import { STATUS_TYPE } from "../../../constant/status-type";

@Component({
    selector: "activity-list",
    templateUrl: "./activity-list.component.html",
    styleUrls: ["../../../../styles.css"]
})

export class ActivityListComponent implements OnInit, OnDestroy {

    dataCourses!: ActivityData[]
    dataEvents!: ActivityData[]
    dataJoinedCourses!: ActivityData[]
    dataJoinedEvents!: ActivityData[]

    first = 0
    limit = 6

    Approved!: string

    id!: string

    isRegister = true
    isPaid = false

    activityId = ''
    activityTitle = ''
    provider = ''
    fee = 0

    fileLink = BASE_URL.FILE

    private activityCoursesSubscription?: Subscription
    private activityEventsSubscription?: Subscription
    private activityJoinedCoursesSubscription?: Subscription
    private activityJoinedEventsSubscription?: Subscription
    private paramSubscription?: Subscription
    private activitySubscription?: Subscription
    private paidSubscription?: Subscription

    constructor(private activityService: ActivityService, private paymentActivityService: PaymentActivityService, private active: ActivatedRoute) { }

    ngOnInit(): void {
        this.init()
    }

    onScroll() {
        this.first += this.limit
        this.addDataCourses()
        this.addDataEvents()
        this.addDataJoinedCourses()
        this.addDataJoinedEvents()
    }

    init() {
        this.activityCoursesSubscription = this.activityService.getAllCourse(this.first, this.limit).subscribe(result => {
            this.dataCourses = result.data
            for (let i = 0; i < this.dataCourses.length; i++) {
                // if (this.dataCourses == STATUS_TYPE.APPROVED) {
                //     this.dataCourses[i].isJoined = true
                // }
            }
            console.log(this.dataCourses)
        })

        this.activityEventsSubscription = this.activityService.getAllEvent(this.first, this.limit).subscribe(result => {
            this.dataEvents = result.data
            // this.isPaid = true
            // this.isRegister = false
        })

        this.activityJoinedCoursesSubscription = this.activityService.getAllJoinedCourseById(this.first, this.limit).subscribe(result => {
            this.dataJoinedCourses = result.data
        })

        this.activityJoinedEventsSubscription = this.activityService.getAllJoinedEventById(this.first, this.limit).subscribe(result => {
            this.dataJoinedEvents = result.data
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
    addDataJoinedCourses() {
        this.activityJoinedCoursesSubscription = this.activityService.getAllJoinedCourseById(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataJoinedCourses.push(result.data[i])
            }
        })
    }
    addDataJoinedEvents() {
        this.activityJoinedEventsSubscription = this.activityService.getAllJoinedEventById(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataJoinedEvents.push(result.data[i])
            }
        })
    }

    ngOnDestroy(): void {
        this.activityCoursesSubscription?.unsubscribe()
        this.activityEventsSubscription?.unsubscribe()
        this.activityJoinedCoursesSubscription?.unsubscribe()
        this.activityJoinedEventsSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
        this.activitySubscription?.unsubscribe()
    }
}