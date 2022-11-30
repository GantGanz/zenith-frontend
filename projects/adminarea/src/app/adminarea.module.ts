import { NgModule } from "@angular/core"
import { ArticleModule } from "./pages/admin-article/article.module"
import { IndustryModule } from "./pages/master-industry/industry.module"
import { PositionModule } from "./pages/master-position/position.module"
import { UserModule } from "./pages/master-user-admin/user.module"
import { ReportModule } from "./pages/report/report.module"
import { ProfileModule } from "./pages/profile/profile.module"
import { NotFoundAdminModule } from "./pages/not-found/not-found.module"

@NgModule({
    imports: [
        UserModule,
        PositionModule,
        IndustryModule,
        ReportModule,
        ArticleModule,
        ProfileModule,
        NotFoundAdminModule
    ],
    exports: [
        UserModule,
        PositionModule,
        IndustryModule,
        ReportModule,
        ArticleModule,
        ProfileModule,
    ]
})
export class AdminAreaModule { }