import { Routes } from "@angular/router";
import { ContentComponent } from "./components/content/content.component";

export const memberAreaRoutes: Routes = [
    {
        path: "feed",
        loadChildren: () => import("./pages/home/home.module").then(u => u.HomeModule)
    },
    {
        path: "courses",
        component: ContentComponent,
        loadChildren: () => import("./pages/course/course.module").then(cr => cr.CourseModule)
    },
    {
        path: "events",
        component: ContentComponent,
        loadChildren: () => import("./pages/member-event/event.module").then(ev => ev.EventModule)
    },
    {
        path: "premium",
        loadChildren: () => import("./pages/premium/premium.module").then(p => p.PremiumModule)
    }
]