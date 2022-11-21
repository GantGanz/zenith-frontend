import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { SuperAdminContentComponent } from "../../component/content/super admin/super-admin.content.component";
import { IndustryInsertComponent } from "./industry-insert/industry-insert.component";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";



const routes: Routes = [
    {
        path: "",
        component: SuperAdminContentComponent,
        children: [
            {
                path: "list",
                component: IndustryListComponent
            },
            {
                path: "new",
                component: IndustryInsertComponent
            },
            {
                path: "edit/:id",
                component: IndustryUpdateComponent
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

export class IndustryRouting { }
