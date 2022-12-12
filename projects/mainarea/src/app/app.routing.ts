import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing"
import { ContentAdminModule } from "projects/adminarea/src/app/component/content/content.module"
import { ContentMemberModule } from "projects/memberarea/src/app/components/content/content.module"
import { memberAreaRoutes } from "projects/memberarea/src/app/memberarea.routing"
import { CanActiveAuth } from "./guard/can-active-auth.guard"
import { LoginComponent } from "./pages/login/login.component"
import { NotFoundComponent } from "./pages/not-found/not-found.component"
import { SignUpComponent } from "./pages/sign-up/sign-up.component"


const mainRoutes: Routes = [

    ...adminAreaRoutes,
    ...memberAreaRoutes,

    {
        path: "admin/login",
        component: LoginComponent,
        canActivate: [
            CanActiveAuth
        ]
    },
    {
        path: "member/login",
        component: LoginComponent,
        canActivate: [
            CanActiveAuth
        ]
    },
    {
        path: "sign-up",
        component: SignUpComponent
    },
    {
        path: "",
        redirectTo: "/member/login",
        pathMatch: "full"
    },
    {
        path: "**",
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes),
        ContentMemberModule,
        ContentAdminModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting { }