import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportRouting } from "./report.routing";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ReportMemberComponent } from "./report-member/report-member.component";


@NgModule({
    declarations: [
        ReportIncomeComponent, ReportMemberComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReportRouting,
        TableModule,
        ConfirmDialogModule,
    ],
    exports: [
        ReportIncomeComponent, ReportMemberComponent
    ]
})
export class ReportModule { }