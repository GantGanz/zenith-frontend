import { Routes } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { ContentComponent } from "./components/content/content.component";
import { NotFoundMemberComponent } from "./pages/not-found/not-found-member.component";

export const memberAreaRoutes: Routes = [
    {
        path: "feed",
        component: ContentComponent,
        loadChildren: () => import("./pages/home/home.module").then(u => u.HomeModule),
        canLoad: [
            MemberGuard
        ]
    },
    {
        path: "articles",
        loadChildren: () => import("./pages/article/article.module").then(a => a.ArticleModule),
        canLoad: [
            MemberGuard
        ]
    },
    {
        path: "profile",
        component: ContentComponent,
        loadChildren: () => import("./pages/settings-profile/profile.module").then(s => s.ProfileModule),
        canLoad: [
            MemberGuard
        ]
    },
    {
        path: "activities",
        component: ContentComponent,
        loadChildren: () => import("./pages/activity/activity.module").then(a => a.ActivityModule),
        canLoad: [
            MemberGuard
        ]
    },
    {
        path: "payment",
        loadChildren: () => import("./pages/payment/payment.module").then(p => p.PaymentModule)
    },
    {
        path: "my-activity",
        component: ContentComponent,
        loadChildren: () => import("./pages/my-activity/my-activity.module").then(m => m.MyActivityModule),
        canLoad: [
            MemberGuard
        ]
    },
    {
        path: "report",
        component: ContentComponent,
        loadChildren: () => import("./pages/report/report.module").then(r => r.ReportModule),
        canLoad: [
            MemberGuard
        ]
    },
]