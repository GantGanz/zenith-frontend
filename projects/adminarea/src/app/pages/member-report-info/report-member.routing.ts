import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SuperAdminContentComponent } from "../../component/content/super admin/super-admin.content.component";



const routes: Routes = [
    {
        path: "",
        component: SuperAdminContentComponent
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

export class ReportMemberRouting { }