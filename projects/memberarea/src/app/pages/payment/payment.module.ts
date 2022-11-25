import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PaymentActivityComponent } from "./payment-activity/payment-activity.component";
import { PaymentRouting } from "./payment.routing";
import { DividerModule } from 'primeng/divider'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [
        PaymentActivityComponent,
    ],
    imports: [
        RouterModule, CommonModule, PaymentRouting,
        DividerModule,
        FileUploadModule,
        HttpClientModule
    ],
    exports: [
        PaymentActivityComponent
    ]
})
export class PaymentModule { }