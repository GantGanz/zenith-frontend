import { Component } from "@angular/core";

@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html"
})
export class ReportIncomeComponent {

    first = 0
    rows = 10

    reportIncome: any = [
        {
            memberName: "Sarah",
            type: "Event",
            totalIncome: 90
        },
        {
            memberName: "Sarah",
            type: "Event",
            totalIncome: 90
        }
    ]
}