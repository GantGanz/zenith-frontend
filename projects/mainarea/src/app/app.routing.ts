import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { MainContentModule } from "projects/memberarea/src/app/components/main-content/content.module"
import { MemberAreaModule } from "projects/memberarea/src/app/memberarea.module"
import { memberAreaRoutes } from "projects/memberarea/src/app/memberarea.routing"
import { LoginComponent } from "./pages/login/login.component"
import { SignUpComponent } from "./pages/sign-up/sign-up.component"


const mainRoutes: Routes = [
    ...memberAreaRoutes,
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "sign-up",
        component: SignUpComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes),
        MemberAreaModule,
        MainContentModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }