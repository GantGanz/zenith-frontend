import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
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

    industries: any[] = []

    totalIndustries = 0
    first = 0;
    rows = 10;
    position!: string;
    msgs: Message[] = [];

    id!: string

    private industriesSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription
    private deleteSubscription?: Subscription

    industryDelete = this.fb.group({
        id: ['', [Validators.required]],
        industryName: ['', [Validators.required, Validators.maxLength(50)]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    constructor(private confirmationService: ConfirmationService, private primeNgConfig: PrimeNGConfig,
        private industryService: IndustryService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.industries = []
        this.primeNgConfig.ripple = true;
        this.industriesSubscription = this.industryService.getAllLimit(this.first, this.rows).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.industries.push(result.data[i])
            }
        })
        this.countSubscription = this.industryService.count().subscribe(u => {
            this.totalIndustries = u
        })
    }

    getData(offset: number, limit: number) {
        this.industries = []
        this.industriesSubscription = this.industryService.getAllLimit(offset, limit).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.industries.push(result.data[i])
            }
        })
    }

    loadData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    confirmPosition(position: string, index: number) {
        const i = index - this.first
        this.position = position
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.industryDelete.controls['id'].setValue(this.industries[i].id)
                this.industryDelete.controls['industryName'].setValue(this.industries[i].industryName)
                this.industryDelete.controls['isActive'].setValue(false)
                this.industryDelete.controls['version'].setValue(this.industries[i].version)
                this.industriesSubscription = this.industryService.update(this.industryDelete.value).subscribe(() => {
                    this.init()
                })
            },
            key: "positionDialog"
        })
    }

    ngOnDestroy(): void {
        this.industriesSubscription?.unsubscribe()
        this.pageChangeSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}