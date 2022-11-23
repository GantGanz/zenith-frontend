import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms";
import { IndustryService } from "projects/mainarea/src/app/service/industry.service";
import { Subscription } from "rxjs";

@Component({
    selector: "industry-insert",
    templateUrl: "./industry-insert.component.html"
})
export class IndustryInsertComponent implements OnDestroy{

    private industrySubscription?: Subscription

    industryForm = this.fb.group({
        industryCode:[null,[Validators.required,Validators.maxLength(5)]],
        industryName:[null,[Validators.required,Validators.maxLength(50)]]
    })

    constructor(private industryService:IndustryService, private fb: FormBuilder){}

    clickSubmit(){
        this.industrySubscription = this.industryService.insert(this.industryForm.value).subscribe(()=>{})
    }

    ngOnDestroy(): void {
        this.industrySubscription?.unsubscribe()
    }
}