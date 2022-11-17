import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeMemberComponent } from "./home-member.component";

const routes: Routes = [
    {
        path: "home-member",
        component: HomeMemberComponent
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

export class HomeMemberRouting { }