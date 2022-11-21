import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminAreaModule } from "projects/adminarea/src/app/adminarea.module"
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing"
import { ContentAdminModule } from "projects/adminarea/src/app/component/content/content.module"
import { ContentMemberModule } from "projects/memberarea/src/app/components/content/content.module"
import { MemberAreaModule } from "projects/memberarea/src/app/memberarea.module"
import { memberAreaRoutes } from "projects/memberarea/src/app/memberarea.routing"
import { LoginComponent } from "./pages/login/login.component"
import { SignUpComponent } from "./pages/sign-up/sign-up.component"


const mainRoutes: Routes = [
    {
        path: " ",
        redirectTo: "/member/login",
        pathMatch: "full"
    },
    {
        path: "admin/login",
        component: LoginComponent
    },
    {
        path: "member/login",
        component: LoginComponent
    },
    {
        path: "sign-up",
        component: SignUpComponent
    },
    ...memberAreaRoutes,
    ...adminAreaRoutes,
]

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes),
        MemberAreaModule,
        AdminAreaModule,
        ContentMemberModule,
        ContentAdminModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }