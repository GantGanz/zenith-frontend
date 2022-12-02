import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
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

    limit = this.rows
    totalReports!: number

    private reportsSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription

    reportDownload = this.fb.group({
        startAt: ['1000-01-01', [Validators.required]],
        endAt: ['3000-12-12', [Validators.required]],
    })

    constructor(private reportService: ReportService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.reportsSubscription = this.reportService.getAllMemberIncome(this.reportDownload.value.startAt!, this.reportDownload.value.endAt!, this.first, this.limit).subscribe(result => {
            this.reportsRes = result.data
        })
        this.countSubscription = this.reportService.countMemberIncome(this.reportDownload.value.startAt!, this.reportDownload.value.endAt!).subscribe(result => {
            this.totalReports = result
        })
    }

    getData(offset: number, limit: number) {
        this.pageChangeSubscription = this.reportService.getAllMemberIncome(this.reportDownload.value.startAt!, this.reportDownload.value.endAt!, offset, limit).subscribe(result => {
            this.reportsRes = result.data
        })
    }

    loadData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.reportsSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
    }
}