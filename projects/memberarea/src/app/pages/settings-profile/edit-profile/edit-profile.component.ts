import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IndustryData } from "projects/interface/industry/industry-data";
import { PositionData } from "projects/interface/position/position-data";
import { IndustryService } from "projects/mainarea/src/app/service/industry.service";
import { PositionService } from "projects/mainarea/src/app/service/position.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "edit-profile",
    templateUrl: "./edit-profile.component.html",
    styleUrls: ["../../../../styles.css"]
})
export class EditProfileComponent {

    userUpdateForm = this.fb.group({
        id: ['', [Validators.required]],
        fullname: ['', [Validators.required, Validators.maxLength(50)]],
        email: [{value:'',disabled:true}, [Validators.email, Validators.required, Validators.maxLength(50)]],
        company: ['', [Validators.required]],
        positionId: ['', [Validators.required]],
        industryId: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    positions: PositionData[] = []
    industries: IndustryData[] = []

    private industrySubscription?: Subscription
    private userSubscription?: Subscription
    private positionSubscription?: Subscription
    private paramSubscription?: Subscription
    private updateSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private active: ActivatedRoute,
        private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.userSubscription = this.userService.getById(id).subscribe(result => {
                this.userUpdateForm.patchValue(result.data)
                console.log(this.userUpdateForm.value)
            })
            this.industrySubscription = this.industryService.getAll().subscribe(result => {
                this.industries = result.data
            })
            this.positionSubscription = this.positionService.getAll().subscribe(result => {
                this.positions = result.data
            })
        })
    }

    clickUpdate() {
        this.updateSubscription = this.userService.update(this.userUpdateForm.value).subscribe()
    }

    clickBack() {
        this.router.navigateByUrl("/profile")
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
        this.industrySubscription?.unsubscribe()
        this.positionSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
    }

}