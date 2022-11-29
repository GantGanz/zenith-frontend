import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyActivityUpdateComponent } from "./my-activity-edit/my-activity-update.component";
import { MyActivityComponent } from "./my-activity.component";

const routes: Routes = [
    {
        path: "",
        component: MyActivityComponent
    },
    {
        path: "edit/:id",
        component: MyActivityUpdateComponent
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
export class MyActivityRouting { }