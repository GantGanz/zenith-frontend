import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { ContentComponent } from "../../components/content/content.component";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { ReportMemberComponent } from "./report-participant/report-participant.component";
import { ReportComponent } from "./report.component";



const routes: Routes = [
    {
        path: "",
        component: ReportComponent,
        children: [
            {
                path: "income",
                component: ReportIncomeComponent
            }

        ]
    },
    {
        path: "",
        component: ReportComponent,
        children: [
            {
                path: "participants",
                component: ReportMemberComponent
            }

        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ReportRouting { }