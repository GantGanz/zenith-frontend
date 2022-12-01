import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PositionService } from "projects/mainarea/src/app/service/position.service";
import { finalize, Subscription } from "rxjs";

@Component({
    selector: "position-insert",
    templateUrl: "./position-insert.component.html"
})
export class PositionInsertComponent implements OnDestroy {

    loading = false

    private insertSubscription?: Subscription
    positionForm = this.fb.group({
        positionCode: [null, [Validators.required, Validators.maxLength(5)]],
        positionName: [null, [Validators.required, Validators.maxLength(50)]]
    })

    constructor(private positionService: PositionService, private fb: FormBuilder,
        private router: Router) { }

    clickSubmit() {
        this.loading = true
        this.insertSubscription = this.positionService.insert(this.positionForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => {
            this.router.navigateByUrl('/positions/list')
        })
    }

    ngOnDestroy(): void {
        this.insertSubscription?.unsubscribe()
    }


}