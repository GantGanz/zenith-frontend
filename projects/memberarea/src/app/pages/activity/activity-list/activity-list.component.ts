import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivitiesRes } from "projects/interface/activity/activities-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ActivityService } from "projects/mainarea/src/app/service/activity.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "activity-list",
    templateUrl: "./activity-list.component.html",
    styleUrls: ["activity-list.component.css"]
})

export class ActivityListComponent implements OnInit, OnDestroy {

    activitieCoursesRes!: ActivitiesRes

    first = 0
    limit = 6

    fileLink = BASE_URL.FILE

    private activitieCoursesSubscription?: Subscription
    private userSubscription?: Subscription

    constructor(private activityService: ActivityService, private userService: UserService) { }

    ngOnInit(): void {
        this.init()
    }

    onScroll() {
        this.limit += 3
        this.init()
    }

    init() {
        this.activitieCoursesSubscription = this.activityService.getAllCourse(this.first, this.limit).subscribe(result => {
            this.activitieCoursesRes = result
        })

    }
    ngOnDestroy(): void {
        this.activitieCoursesSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
    }
}