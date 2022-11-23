import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentEvent } from "./payment-event/payment-event.component";
import { PaymentPremium } from "./payment-premium/payment-premium.component";
import { PaymentRouting } from "./payment.routing";
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'

@NgModule({
    declarations: [
        PaymentEvent, PaymentPremium
    ],
    imports: [
        RouterModule, CommonModule, PaymentRouting,
        InputTextModule,
        TableModule,
        ButtonModule
    ],
    exports: [
        PaymentEvent, PaymentPremium
    ]
})
export class PaymentModule { }