import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivityData } from "projects/interface/activity/activity-data";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
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

    statusApproved = STATUS_TYPE.APPROVED
    statusRejected = STATUS_TYPE.REJECTED
    statusPending = STATUS_TYPE.PENDING

    first = 0
    limit = 3
    tabIndex = 0
    activityCount = 0

    Approved!: string

    id = ''
    dataEmpty = true
    dataNotEmpty = false

    isRegister = true
    isPaid = false

    activityId = ''
    activityTitle = ''
    provider = ''
    fee = 0

    dataEmptyCourse = false
    dataEmptyEvent = false
    dataEmptyJoinedCourse = false
    dataEmptyJoinedEvent = false

    fileLink = BASE_URL.FILE

    private activityCoursesSubscription?: Subscription
    private activityEventsSubscription?: Subscription
    private activityJoinedCoursesSubscription?: Subscription
    private activityJoinedEventsSubscription?: Subscription
    private paramSubscription?: Subscription
    private activitySubscription?: Subscription
    private userSubscription?: Subscription
    private countCourseSubscription?: Subscription
    private countEventSubscription?: Subscription
    private countMyCourseSubscription?: Subscription
    private countMyEventSubscription?: Subscription
    private countJoinedCourseSubscription?: Subscription
    private countJoinedEventSubscription?: Subscription

    constructor(private activityService: ActivityService, private userService: UserService, private title : Title) { 
        this.title.setTitle('activity | zenith')
    }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => this.id = result.data.id)
        this.courseInit()
    }

    onScroll() {
        this.first += this.limit
        if (this.tabIndex == 0) {
            if (this.dataCourses.length < this.activityCount) {
                this.addDataCourses()
            }
        } else if (this.tabIndex == 1) {
            if (this.dataEvents.length < this.activityCount) {
                this.addDataEvents()
            }
        } else if (this.tabIndex == 2) {
            if (this.dataJoinedCourses.length < this.activityCount) {
                this.addDataJoinedCourses()
            }
        } else {
            if (this.dataJoinedEvents.length < this.activityCount) {
                this.addDataJoinedEvents()
            }
        }
    }

    courseInit() {
        this.activityCoursesSubscription = this.activityService.getAllCourse(this.first, this.limit).subscribe(result => {
            this.dataCourses = result.data
            for (let i = 0; i < this.dataCourses.length; i++) {
                if (this.dataCourses[i].paymentStatus == STATUS_TYPE.APPROVED || this.dataCourses[i].paymentStatus == STATUS_TYPE.PENDING) {
                    this.dataCourses[i].isJoined = true
                }
            }
        })
        this.countCourseSubscription = this.activityService.countCourse().subscribe(count => {
            this.activityCount = count
            if (count == 0) {
                this.dataEmptyCourse = true
            } else {
                this.dataEmptyCourse = false
            }
        })
    }

    eventInit() {
        this.activityEventsSubscription = this.activityService.getAllEvent(this.first, this.limit).subscribe(result => {
            this.dataEvents = result.data
            for (let i = 0; i < this.dataEvents.length; i++) {
                if (this.dataEvents[i].paymentStatus == STATUS_TYPE.APPROVED || this.dataEvents[i].paymentStatus == STATUS_TYPE.PENDING) {
                    this.dataEvents[i].isJoined = true
                }
            }
        })
        this.countEventSubscription = this.activityService.countEvent().subscribe(count => {
            this.activityCount = count
            if (count == 0) {
                this.dataEmptyEvent = true
            } else {
                this.dataEmptyEvent = false
            }
        })
    }

    joinedCourseInit() {
        this.activityJoinedCoursesSubscription = this.activityService.getAllJoinedCourseById(this.first, this.limit).subscribe(result => {
            this.dataJoinedCourses = result.data
        })
        this.countJoinedCourseSubscription = this.activityService.countJoinedCourse().subscribe(count => {
            this.activityCount = count
            console.log(count);

            if (count == 0) {
                this.dataEmptyJoinedCourse = true
            } else {
                this.dataEmptyJoinedCourse = false
            }
        })
    }

    joinedEventInit() {
        this.activityJoinedEventsSubscription = this.activityService.getAllJoinedEventById(this.first, this.limit).subscribe(result => {
            this.dataJoinedEvents = result.data
        })
        this.countJoinedEventSubscription = this.activityService.countJoinedEvent().subscribe(count => {
            this.activityCount = count
            if (count == 0) {
                this.dataEmptyJoinedEvent = true
            } else {
                this.dataEmptyJoinedEvent = false
            }
        })
    }

    tabClick(event: any) {
        this.first = 0
        if (event.index == 0) {
            this.courseInit()
        } else if (event.index == 1) {
            this.eventInit()
        } else if (event.index == 2) {
            this.joinedCourseInit()
        } else {
            this.joinedEventInit()
        }
    }

    addDataCourses() {
        this.activityCoursesSubscription = this.activityService.getAllCourse(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataCourses.push(result.data[i])
                const index = i + this.first
                if (this.dataCourses[index].paymentStatus == STATUS_TYPE.APPROVED || this.dataCourses[index].paymentStatus == STATUS_TYPE.PENDING) {
                    this.dataCourses[index].isJoined = true
                }
            }
        })
    }
    addDataEvents() {
        this.activityEventsSubscription = this.activityService.getAllEvent(this.first, this.limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.dataEvents.push(result.data[i])
                const index = i + this.first
                if (this.dataCourses[index].paymentStatus == STATUS_TYPE.APPROVED || this.dataCourses[index].paymentStatus == STATUS_TYPE.PENDING) {
                    this.dataCourses[index].isJoined = true
                }
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
        this.countCourseSubscription?.unsubscribe()
        this.countEventSubscription?.unsubscribe()
        this.countMyCourseSubscription?.unsubscribe()
        this.countMyEventSubscription?.unsubscribe()
        this.countJoinedCourseSubscription?.unsubscribe()
        this.countJoinedEventSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
        this.activitySubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
    }
}