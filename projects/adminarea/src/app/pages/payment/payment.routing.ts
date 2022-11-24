import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContentComponent } from "../../component/content/admin/admin.content.component";
import { PaymentActivity } from "./payment-activity/payment-activity.component";
import { PaymentPremium } from "./payment-premium/payment-premium.component";


const routes: Routes = [
    {
        path: "",
        component: AdminContentComponent,
        children: [
            {
                path: "premium",
                component: PaymentPremium
            },
            {
                path: "event",
                component: PaymentActivity
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