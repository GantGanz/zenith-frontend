import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, LazyLoadEvent, Message } from 'primeng/api';
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

    totalIndustries = 0
    first = 0;
    rows = 10;
    position!: string;
    msgs: Message[] = [];

    id!: string

    private industriesSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription

    constructor(private confirmationService: ConfirmationService, private primeNgConfig: PrimeNGConfig,
        private industryService: IndustryService) { }

    ngOnInit(): void {
        this.primeNgConfig.ripple = true;
        this.industriesSubscription = this.industryService.getAllLimit(this.first,this.rows).subscribe(result=>{
            this.industriesRes = result
        })
        this.countSubscription = this.industryService.count().subscribe(u=>{
            this.totalIndustries=u
        })
    }

    getData(offset: number, limit:number){
        this.industriesSubscription = this.industryService.getAllLimit(offset,limit).subscribe(result=>{
            this.industriesRes = result
        })
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first!, event.rows!)
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
        this.pageChangeSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
    }
}