import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "projects/mainarea/src/app/guard/admin.guard";
import { AdminContentComponent } from "../../component/content/admin/admin.content.component";
import { PaymentActivity } from "./payment-activity/payment-activity.component";
import { PaymentPremium } from "./payment-premium/payment-premium.component";


const routes: Routes = [
    {
        path: "",
        component: AdminContentComponent,
        children: [
            {
                path: "member-premium",
                component: PaymentPremium,
                canActivate:[
                    AdminGuard
                ]
            },
            {
                path: "event",
                component: PaymentActivity,
                canActivate:[
                    AdminGuard
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