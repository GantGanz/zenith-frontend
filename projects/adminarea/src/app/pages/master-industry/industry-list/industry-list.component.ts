import { Component, OnInit } from "@angular/core"

@Component({
    selector: "industry-list",
    templateUrl: "./industry-list.component.html"
})
export class IndustryListComponent implements OnInit {

    first = 0
    rows = 10
    position!: string

    ngOnInit(): void {
    }

    industries: any = [
        {
            no: "1",
            code: "IN001",
            name: "Healthcare and Social Assistance",
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
        return this.industries ? this.first === (this.industries.length - this.rows) : true
    }

    isFirstPage(): boolean {
        return this.industries ? this.first === 0 : true
    }
}