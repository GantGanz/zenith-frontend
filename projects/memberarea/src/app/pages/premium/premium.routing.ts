import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContentComponent } from "../../components/content/content.component";
import { PremiumComponent } from "./premium.component";



const routes: Routes = [
    {
        path: "",
        component: ContentComponent,
        children: [
            {
                path: "",
                component: PremiumComponent
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

export class PremiumRouting { }