import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PostUpdateHomeComponent } from "./post-update/post-update.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: "edit-post/:id",
        component: PostUpdateHomeComponent
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