import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContentComponent } from "../../component/content/admin/admin.content.component";
import { PaymentEvent } from "./payment-event/payment-event.component";
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
                component: PaymentEvent
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