import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html"
})
export class ReportComponent {

    constructor(private router: Router, private title: Title) { 
        this.title.setTitle('Report | Zenith')
    }
    clickBack() {
        this.router.navigateByUrl("/my-activity")
    }
}