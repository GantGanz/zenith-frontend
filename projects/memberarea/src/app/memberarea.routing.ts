import { Routes } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { ContentComponent } from "./components/content/content.component";

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
        path: "premium",
        loadChildren: () => import("./pages/premium/premium.module").then(p => p.PremiumModule),
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
        loadChildren: () => import("./pages/activity/activity.module").then(a => a.ActivityModule),
        canLoad: [
            MemberGuard
        ]
    }
]