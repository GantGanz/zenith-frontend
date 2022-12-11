import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { PositionRes } from "projects/interface/position/position-res";
import { PositionService } from "projects/mainarea/src/app/service/position.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "position-update",
    templateUrl: "./position-update.component.html"
})
export class PositionUpdateComponent implements OnInit, OnDestroy {

    loading = false

    positionForm = this.fb.group({
        id: ['', [Validators.required]],
        positionCode: ['', [Validators.required, Validators.maxLength(5)]],
        positionName: ['', [Validators.required, Validators.maxLength(50)]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    private positionSubscription?: Subscription
    private updateSubscription?: Subscription
    private paramSubscription?: Subscription

    constructor(private active: ActivatedRoute, private positionService: PositionService,
        private fb: FormBuilder, private title: Title) {
        this.title.setTitle('Update Position | Zenith')
    }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.positionSubscription = this.positionService.getById(id).subscribe(result => {
                this.positionForm.patchValue(result.data)
            })
        })
    }

    clickUpdate() {
        this.loading = true
        this.updateSubscription = this.positionService.update(this.positionForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => {
            this.init()
        })
    }
    ngOnDestroy(): void {
        this.positionSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
    }

}