import { Component } from "@angular/core";

@Component({
    selector: "activity-insert",
    templateUrl: "./activity-insert.component.html"
})
export class ActivityInsertComponent {

    activityType: any = [
        { name: "event" },
        { name: "course" }
    ]
}