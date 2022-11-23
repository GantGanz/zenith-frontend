import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, Message } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { IndustriesRes } from "projects/interface/industry/industries-res";
import { IndustryService } from "projects/mainarea/src/app/service/industry.service";
import { Subscription } from "rxjs";

@Component({
    selector: "industry-list",
    templateUrl: "./industry-list.component.html"
})
export class IndustryListComponent implements OnInit, OnDestroy {

    industriesRes!: IndustriesRes

    first = 0;
    rows = 10;
    position!: string;
    msgs: Message[] = [];

    private industriesSubscription?: Subscription

    constructor(private confirmationService: ConfirmationService, private primeNgConfig: PrimeNGConfig,
        private industryService: IndustryService) { }

    ngOnInit(): void {
        this.primeNgConfig.ripple = true;
        this.industriesSubscription = this.industryService.getAllLimit(this.first,this.rows).subscribe(result=>{
            this.industriesRes = result
        })
    }

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
        })
    }

    ngOnDestroy(): void {
        this.industriesSubscription?.unsubscribe()
    }
}