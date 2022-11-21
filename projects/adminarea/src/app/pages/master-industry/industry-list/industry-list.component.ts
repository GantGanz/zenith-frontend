import { Component, OnInit } from "@angular/core";
import { ConfirmationService, Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: "industry-list",
    templateUrl: "./industry-list.component.html"
})
export class IndustryListComponent implements OnInit {

    first = 0;
    rows = 10;
    position!: string;
    msgs: Message[] = [];

    constructor(private confirmationService: ConfirmationService, private primeNgConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        this.primeNgConfig.ripple = true;
    }

    industries: any = [
        {
            no: "1",
            code: "IN001",
            name: "Healthcare and Social Assistance",
        }
    ]

    confirmPosition(position: string) {
        this.position = position
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            },
            key: "positionDialog"
        });
    }


    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.industries ? this.first === (this.industries.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.industries ? this.first === 0 : true;
    }
}