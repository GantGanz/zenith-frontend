import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentComponent } from "../../components/content/content.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
        path: "",
        component: ContentComponent,
        children: [
            {
                path: "",
                component: HomeComponent
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

export class HomeRouting { }