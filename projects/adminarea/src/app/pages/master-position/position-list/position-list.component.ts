import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { ConfirmationService, LazyLoadEvent } from "primeng/api"
import { PositionsRes } from "projects/interface/position/positions-res"
import { PositionService } from "projects/mainarea/src/app/service/position.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: "position-list",
    templateUrl: "./position-list.component.html"
})
export class PositionListComponent implements OnInit, OnDestroy {

    first = 0
    rows = 10

    totalPositions!: number
    positions: any[] = []

    tableLoad = false

    positionDelete = this.fb.group({
        id: ['', [Validators.required]],
        positionName: ['', [Validators.required, Validators.maxLength(50)]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    private countSubscription?: Subscription
    private positionsSubscription?: Subscription
    private changePageSubscription?: Subscription
    private deleteSubscription?: Subscription

    constructor(private positionService: PositionService, private confirmationService: ConfirmationService,
        private fb: FormBuilder, private title: Title) {
        this.title.setTitle('Position | Zenith')
    }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.tableLoad = true
        this.positions = []
        this.countSubscription = this.positionService.count().subscribe(u => {
            this.totalPositions = u
        })
        this.positionsSubscription = this.positionService.getAllLimit(this.first, this.rows).pipe(finalize(() => this.tableLoad = false)).subscribe(result => {
            for (let i = 0; i < result.data.length; i++) {
                this.positions.push(result.data[i])
            }
        })
    }

    getData(offset: number, limit: number) {
        this.tableLoad = true
        this.changePageSubscription = this.positionService.getAllLimit(offset, limit).pipe(finalize(() => this.tableLoad = false)).subscribe(result => {
            this.positions = []
            for (let i = 0; i < result.data.length; i++) {
                this.positions.push(result.data[i])
            }
        })
    }

    loadData(event: LazyLoadEvent) {
        this.first = event.first!
        this.getData(event.first!, event.rows!)
    }

    confirmPosition(index: number) {
        const i = index - this.first
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.positionDelete.controls['id'].setValue(this.positions[i].id)
                this.positionDelete.controls['positionName'].setValue(this.positions[i].positionName)
                this.positionDelete.controls['isActive'].setValue(false)
                this.positionDelete.controls['version'].setValue(this.positions[i].version)
                this.deleteSubscription = this.positionService.update(this.positionDelete.value).subscribe(() => {
                    this.init()
                })

            },
            key: "positionDialog"
        })
    }

    ngOnDestroy(): void {
        this.countSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.changePageSubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}