import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyActivityComponent } from "./my-activity.component";

const routes: Routes = [
    {
        path: "",
        component: MyActivityComponent
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