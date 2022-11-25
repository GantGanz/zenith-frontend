import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentPremium } from "./payment-premium/payment-premium.component";
import { PaymentRouting } from "./payment.routing";
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from "primeng/image";
import { PaymentActivity } from "./payment-activity/payment-activity.component";
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from "primeng/confirmdialog";

@NgModule({
    declarations: [
        PaymentActivity, PaymentPremium
    ],
    imports: [
        RouterModule, CommonModule, PaymentRouting,
        InputTextModule,
        TableModule,
        ButtonModule,
        ImageModule,
        TabViewModule,
        ConfirmDialogModule
    ],
    exports: [
        PaymentActivity, PaymentPremium
    ]
})
export class PaymentModule { }