import { formatDate } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LazyLoadEvent } from "primeng/api";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ReportService } from "projects/mainarea/src/app/service/report.service";
import { Subscription } from "rxjs";

@Component({
    selector: "report-income",
    templateUrl: "./report-income.component.html"
})
export class ReportIncomeComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE

    first = 0;
    rows = 10;
    position: string = 'top'
    reportsRes: any[] = []
    dateRange: any[] = []

    limit = this.rows
    totalReports!: number

    private reportsSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription
    private exportsSubscription?: Subscription

    date = this.fb.group({
        startDate: ['1000-01-01'],
        endDate: ['3000-12-12'],
    })

    constructor(private reportService: ReportService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.reportsSubscription = this.reportService.getAllMemberIncome(this.date.value.startDate!, this.date.value.endDate!, this.first, this.limit).subscribe(result => {
            this.reportsRes = result.data
        })
        this.countSubscription = this.reportService.countMemberIncome(this.date.value.startDate!, this.date.value.endDate!).subscribe(result => {
            this.totalReports = result
        })
    }

    getDates() {
        if (this.dateRange[0] !== null && this.dateRange[1] !== null) {
            this.date.patchValue({
                startDate: formatDate(this.dateRange[0]!, `yyyy-MM-dd`, 'en'),
                endDate: formatDate(this.dateRange[1]!, `yyyy-MM-dd`, 'en')
            })
            this.getData(this.first, this.limit)
        }
    }

    getData(offset: number, limit: number) {
        this.pageChangeSubscription = this.reportService.getAllMemberIncome(this.date.value.startDate!, this.date.value.endDate!, offset, limit).subscribe(result => {
            this.reportsRes = result.data
        })
        this.countSubscription = this.reportService.countMemberIncome(this.date.value.startDate!, this.date.value.endDate!).subscribe(result => {
            this.totalReports = result
        })
    }

    loadData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    export() {
        this.exportsSubscription = this.reportService.reportMemberIncome(this.date.value.startDate!, this.date.value.endDate!).subscribe(result => { })
    }

    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.reportsSubscription?.unsubscribe()
        this.exportsSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
    }
}