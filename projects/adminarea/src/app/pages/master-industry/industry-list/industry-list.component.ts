import { Component } from "@angular/core";

@Component({
    selector: "industry-list",
    templateUrl: "./industry-list.component.html"
})
export class IndustryListComponent {

    industries: any = [
        {
            no: "1",
            code: "IN001",
            name: "Healthcare and Social Assistance",
        }
    ]
}