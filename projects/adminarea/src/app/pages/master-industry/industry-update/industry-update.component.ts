import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { IndustryService } from "projects/mainarea/src/app/service/industry.service";
import { Subscription } from "rxjs";

@Component({
    selector: "industry-update",
    templateUrl: "./industry-update.component.html"
})
export class IndustryUpdateComponent implements OnInit, OnDestroy {

    private industrySubscription?: Subscription
    private industryUpdateSubscription?: Subscription
    private paramSubscription?: Subscription


    industryForm = this.fb.group({
        id: ['', [Validators.required]],
        industryCode: ['', [Validators.required, Validators.maxLength(5)]],
        industryName: ['', [Validators.required, Validators.maxLength(50)]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    constructor(private industryService: IndustryService, private fb: FormBuilder,
        private active: ActivatedRoute, private title: Title) {
        this.title.setTitle('Update Industry | Zenith')
    }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.industrySubscription = this.industryService.getbyId(id).subscribe(result => {
                this.industryForm.controls['id'].setValue(result.data.id)
                this.industryForm.controls['industryCode'].setValue(result.data.industryCode)
                this.industryForm.controls['industryName'].setValue(result.data.industryName)
                this.industryForm.controls['isActive'].setValue(result.data.isActive)
                this.industryForm.controls['version'].setValue(result.data.version)
            })
        })
    }

    clickUpdate() {
        this.industryUpdateSubscription = this.industryService.update(this.industryForm.value).subscribe()
    }

    ngOnDestroy(): void {
        this.industrySubscription?.unsubscribe()
        this.industryUpdateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
    }

}