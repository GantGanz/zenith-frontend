import { Routes } from "@angular/router"
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard"
import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard"

// import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard"
// import { SuperAdminGuard } from "projects/mainarea/src/app/guard/super-admin.guard"

export const adminAreaRoutes: Routes = [
    {
        path: "dashboard",
        loadChildren: () => import("./pages/dashboard/dashboard.module").then(d => d.DashboardModule)
    },
    {
        path: "users",
        loadChildren: () => import("./pages/master-user-admin/user.module").then(u => u.UserModule),
        canLoad: [
            SuperAdminGuard
        ]
    },
    {
        path: "",
        loadChildren: () => import("./pages/profile/profile.module").then(p => p.ProfileModule)
    },
    {
        path: "positions",
        loadChildren: () => import("./pages/master-position/position.module").then(p => p.PositionModule),
        canLoad: [
            SuperAdminGuard
        ]
    },
    {
        path: "industries",
        loadChildren: () => import("./pages/master-industry/industry.module").then(i => i.IndustryModule),
        canLoad: [
            SuperAdminGuard
        ]
    },
    {
        path: "report",
        loadChildren: () => import("./pages/report/report.module").then(i => i.ReportModule),
        canLoad: [
            SuperAdminGuard
        ]
    },
    {
        path: "admin/articles",
        loadChildren: () => import("./pages/admin-article/article.module").then(a => a.ArticleModule),
        canLoad: [
            AdminGuard
        ]
    },
    {
        path: "payment",
        loadChildren: () => import("./pages/payment/payment.module").then(p => p.PaymentModule),
        canLoad: [
            AdminGuard
        ]
    }
]