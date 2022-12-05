import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContentMemberModule } from "./components/content/content.module";
import { ActivityModule } from "./pages/activity/activity.module";
import { ArticleModule } from "./pages/article/article.module";
import { HomeModule } from "./pages/home/home.module";
import { MyActivityModule } from "./pages/my-activity/my-activity.module";
import { PaymentModule } from "./pages/payment/payment.module";
import { ReportModule } from "./pages/report/report.module";
import { ProfileModule } from "./pages/settings-profile/profile.module";

@NgModule({
    imports: [
        HomeModule, ActivityModule, ArticleModule, RouterModule,
        MyActivityModule, PaymentModule, ReportModule, ProfileModule, ContentMemberModule
    ],
    exports: [
        HomeModule, ActivityModule, ArticleModule, RouterModule,
        MyActivityModule, PaymentModule, ReportModule, ProfileModule, ContentMemberModule
    ]
})

export class MemberAreaModule { }