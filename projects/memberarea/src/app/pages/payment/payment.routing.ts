import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MemberGuard } from "projects/mainarea/src/app/guard/member.guard";
import { ContentComponent } from "../../components/content/content.component";
import { PaymentActivityComponent } from "./payment-activity/payment-activity.component";
import { PaymentPremiumComponent } from "./payment-premium/payment-premium.component";

const routes: Routes = [
    {
        path: "",
        component: ContentComponent,
        children: [
            {
                path: "activity/:id",
                component: PaymentActivityComponent,
                canActivate:[
                    MemberGuard
                ]
            },
            {
                path: "premium",
                component: PaymentPremiumComponent,
                canActivate:[
                    MemberGuard
                ]
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PaymentRouting { }