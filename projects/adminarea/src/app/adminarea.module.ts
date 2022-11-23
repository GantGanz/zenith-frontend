import { NgModule } from "@angular/core"
import { ArticleModule } from "./pages/admin-article/article.module"
import { IndustryModule } from "./pages/master-industry/industry.module"
import { PositionModule } from "./pages/master-position/position.module"
import { UserModule } from "./pages/master-user-admin/user.module"
import { ReportMemberModule } from "./pages/member-report-info/report-member.module"
import { ProfileModule } from "./pages/profile/profile.module"


@NgModule({
    imports: [
        UserModule,
        PositionModule,
        IndustryModule,
        ReportMemberModule,
        ArticleModule,
        ProfileModule
    ],
    exports: [
        UserModule,
        PositionModule,
        IndustryModule,
        ReportMemberModule,
        ArticleModule,
        ProfileModule
    ]
})
export class AdminAreaModule { }