import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard";
import { SuperAdminContentComponent } from "../../component/content/super admin/super-admin.content.component";
import { ReportIncomeComponent } from "./report-income/report-income.component";
import { ReportMemberComponent } from "./report-member/report-member.component";



const routes: Routes = [
    {
        path: "",
        component: SuperAdminContentComponent,
        children: [
            {
                path: "income-member",
                component: ReportIncomeComponent
            }

        ]
    },
    {
        path: "",
        component: SuperAdminContentComponent,
        children: [
            {
                path: "member",
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