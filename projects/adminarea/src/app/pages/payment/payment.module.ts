import { NgModule } from "@angular/core";
import { PaymentEvent } from "./payment-event/payment-event.component";
import { PaymentSubscriber } from "./payment-premium/payment-subscriber.component";

@NgModule({
    declarations: [
        PaymentEvent, PaymentSubscriber
    ],

})
export class PaymentModule { }