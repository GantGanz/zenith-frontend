import { Component } from "@angular/core"

@Component({
    selector: "position-list",
    templateUrl: "./position-list.component.html"
})
export class PositionListComponent {
    first = 0
    rows = 10

    positions: any = [
        {
            no: "1",
            code: "P001",
            name: "Manager",
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
        return this.positions ? this.first === (this.positions.length - this.rows) : true
    }

    isFirstPage(): boolean {
        return this.positions ? this.first === 0 : true
    }
}