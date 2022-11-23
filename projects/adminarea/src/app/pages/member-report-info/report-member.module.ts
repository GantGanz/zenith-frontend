import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportMemberComponent } from "./report-member.component";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ReportMemberRouting } from "./report-member.routing";

@NgModule({
    declarations: [
        ReportMemberComponent
    ],
    imports: [
        RouterModule,
        ReportMemberRouting,
        TableModule,
        ConfirmDialogModule

    ],
    exports: [
        ReportMemberComponent
    ]
})
export class ReportMemberModule { }