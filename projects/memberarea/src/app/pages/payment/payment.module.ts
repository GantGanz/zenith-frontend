import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentActivityComponent } from "./payment-activity/payment-activity.component";
import { PaymentRouting } from "./payment.routing";
import { DividerModule } from 'primeng/divider'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'
import { PaymentPremiumComponent } from "./payment-premium/payment-premium.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        PaymentActivityComponent, PaymentPremiumComponent
    ],
    imports: [
        RouterModule, CommonModule, PaymentRouting,
        DividerModule,
        FileUploadModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    exports: [
        PaymentActivityComponent, PaymentPremiumComponent
    ]
})
export class PaymentModule { }