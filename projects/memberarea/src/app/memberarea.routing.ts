import { Routes } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { ContentComponent } from "./components/content/content.component";

export const memberAreaRoutes: Routes = [
    {
        path: "courses",
        component: ContentComponent,
        loadChildren: () => import("./pages/course/course.module").then(cr => cr.CourseModule),
        canLoad:[
            MemberGuard
        ]
    },
    {
        path: "events",
        component: ContentComponent,
        loadChildren: () => import("./pages/member-event/event.module").then(ev => ev.EventModule),
        canLoad:[
            MemberGuard
        ]
    },
    {
        path: "feed",
        component: ContentComponent,
        loadChildren: () => import("./pages/home/home.module").then(u => u.HomeModule),
        canLoad:[
            MemberGuard
        ]
    },
    {
        path: "premium",
        loadChildren: () => import("./pages/premium/premium.module").then(p => p.PremiumModule),
        canLoad:[
            MemberGuard
        ]
    },
    {
        path: "articles",
        loadChildren: () => import("./pages/article/article.module").then(a => a.ArticleModule),
        canLoad:[
            MemberGuard
        ]
    },
    {
        path: "profile",
        component: ContentComponent,
        loadChildren: () => import("./pages/settings-profile/profile.module").then(s => s.ProfileModule),
        canLoad:[
            MemberGuard
        ]
    }
]