import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "my-activity",
    templateUrl: "./my-activity.component.html",
    styleUrls: ["../../../styles.css"]
})
export class MyActivityComponent {

    constructor(private router: Router) { }

    clickBack() {
        this.router.navigateByUrl("/profile")
    }
}