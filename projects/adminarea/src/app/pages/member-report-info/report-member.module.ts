import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportMemberComponent } from "./report-member.component";

@NgModule({
    declarations: [
        ReportMemberComponent
    ],
    imports: [
        RouterModule
    ],
    exports: [
        ReportMemberComponent
    ]
})
export class ReportMemberModule { }