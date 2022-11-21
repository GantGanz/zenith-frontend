import { Routes } from "@angular/router";
import { SuperAdminContentComponent } from "./component/content/super admin/super-admin.content.component";

export const adminAreaRoutes: Routes = [
    {
        path: "dashboard",
        loadChildren: () => import("./pages/dashboard/dashboard.module").then(d => d.DashboardModule)
    },
    {
        path: "users",
        loadChildren: () => import("./pages/master-user-admin/user.module").then(u => u.UserModule)
    },
    {
        path: "positions",
        loadChildren: () => import("./pages/master-position/position.module").then(p => p.PositionModule)
    },
    {
        path: "industries",
        loadChildren: () => import("./pages/master-industry/industry.module").then(i => i.IndustryModule)
    },
    {
        path: "member-informations",
        component: SuperAdminContentComponent,
        loadChildren: () => import("./pages/member-report-info/report-member.module").then(ri => ri.ReportMemberModule)
    },
    {
        path: "articles",
        loadChildren: () => import("./pages/admin-article/article.module").then(a => a.ArticleModule)
    },
]