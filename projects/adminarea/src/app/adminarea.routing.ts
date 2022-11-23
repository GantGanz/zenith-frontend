import { Routes } from "@angular/router"

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
        path: "",
        loadChildren: () => import("./pages/profile/profile.module").then(p => p.ProfileModule)
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
        path: "report",
        loadChildren: () => import("./pages/report/report.module").then(i => i.ReportModule)
    },
    {
        path: "articles",
        loadChildren: () => import("./pages/admin-article/article.module").then(a => a.ArticleModule)
    },
    {
        path: "payment",
        loadChildren: () => import("./pages/payment/payment.module").then(p => p.PaymentModule)
    }
]