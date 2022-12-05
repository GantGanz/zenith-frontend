import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AdminAreaModule } from "projects/adminarea/src/app/adminarea.module"
import { adminAreaRoutes } from "projects/adminarea/src/app/adminarea.routing"
import { ContentAdminModule } from "projects/adminarea/src/app/component/content/content.module"
import { ContentMemberModule } from "projects/memberarea/src/app/components/content/content.module"
import { MemberAreaModule } from "projects/memberarea/src/app/memberarea.module"
import { memberAreaRoutes } from "projects/memberarea/src/app/memberarea.routing"
import { CanActiveAuth } from "./guard/can-active-auth.guard"
import { LoginComponent } from "./pages/login/login.component"
import { NotFoundComponent } from "./pages/not-found/not-found.component"
import { SignUpComponent } from "./pages/sign-up/sign-up.component"


const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: "member/login",
        pathMatch: "full"
    },
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
    ...adminAreaRoutes,
    ...memberAreaRoutes,
    {
        path: "**",
        component: NotFoundComponent
    }
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