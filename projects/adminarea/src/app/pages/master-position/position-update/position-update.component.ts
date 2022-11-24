import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PositionRes } from "projects/interface/position/position-res";
import { PositionService } from "projects/mainarea/src/app/service/position.service";
import { Subscription } from "rxjs";

@Component({
    selector: "position-update",
    templateUrl: "./position-update.component.html"
})
export class PositionUpdateComponent implements OnInit, OnDestroy {

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
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.positionSubscription = this.positionService.getById(id).subscribe(result => {
                this.positionForm.controls['id'].setValue(result.data.id)
                this.positionForm.controls['positionCode'].setValue(result.data.positionCode)
                this.positionForm.controls['positionName'].setValue(result.data.positionName)
                this.positionForm.controls['isActive'].setValue(result.data.isActive)
                this.positionForm.controls['version'].setValue(result.data.version)
            })
        })
    }
    
    clickUpdate(){
        this.updateSubscription = this.positionService.update(this.positionForm.value).subscribe()
    }
    ngOnDestroy(): void {
        this.positionSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
    }

}