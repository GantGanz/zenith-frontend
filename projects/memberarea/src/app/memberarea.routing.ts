import { Routes } from "@angular/router";
import { ContentComponent } from "./components/content/content.component";

export const memberAreaRoutes: Routes = [
    {
        path: "feed",
        component: ContentComponent,
        loadChildren: () => import("./pages/home/home.module").then(u => u.HomeModule)
    },
    {
        path: "premium",
        loadChildren: () => import("./pages/premium/premium.module").then(p => p.PremiumModule)
    },
    {
        path: "articles",
        loadChildren: () => import("./pages/article/article.module").then(a => a.ArticleModule)
    },
    {
        path: "profile",
        component: ContentComponent,
        loadChildren: () => import("./pages/settings-profile/profile.module").then(s => s.ProfileModule)
    },
    {
        path: "activities",
        component: ContentComponent,
        loadChildren: () => import("./pages/activity/activity.module").then(a => a.ActivityModule)
    }
]