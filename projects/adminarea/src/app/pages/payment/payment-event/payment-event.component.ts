import { Component } from "@angular/core";


@Component({
    selector: "payment-event",
    templateUrl: "./payment-event.component.html"
})

export class PaymentEvent {
    first = 0
    rows = 10

    events: any = [
        {
            no: "1",
            memberName: "Nathan Alexander",
            title: "Write and publish the best research papers in Q1 journals",
            type: "Course",
            provider: "Lawencon",
            location: "Online",
            schedule: "2022/11/20",
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