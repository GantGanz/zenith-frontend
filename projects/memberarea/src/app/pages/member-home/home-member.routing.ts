import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainContentComponent } from "../../components/main-content/content.component";
import { HomeMemberComponent } from "./home-member.component";

const routes: Routes = [
    {
        path: "member",
        component: MainContentComponent,
        children: [
            {
                path: "",
                component: HomeMemberComponent
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

export class HomeMemberRouting { }