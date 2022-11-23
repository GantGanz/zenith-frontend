import { Component } from "@angular/core";


@Component({
    selector: "payment-premium",
    templateUrl: "./payment-premium.component.html"
})
export class PaymentPremium {
    first = 0
    rows = 10

    events: any = [
        {
            no: "1",
            memberName: "Nathan Alexander",
            email: "nathanalexander@gmail.com",
            companyName: "Lawencon",
            position: "Manager",
            fee: "50.000",
            proof: "../../../../assets/images/profile_admin.png"
        }
    ]

    next() {
        this.first = this.first + this.rows
    }

    prev() {
        this.first = this.first - this.rows
    }

    reset() {
        this.first = 0
    }

    isLastPage(): boolean {
        return this.events ? this.first === (this.events.length - this.rows) : true
    }

    isFirstPage(): boolean {
        return this.events ? this.first === 0 : true
    }
}