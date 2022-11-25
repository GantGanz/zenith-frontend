import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentActivityComponent } from "./payment-activity/payment-activity.component";

const routes: Routes = [
    {
        path: "",
        component: PaymentActivityComponent
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