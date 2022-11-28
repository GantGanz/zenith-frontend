import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
        email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
        company: ['', [Validators.required]],
        positionId: ['', [Validators.required]],
        industryId: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    positions: any[] = []
    industries: any[] = []

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
                this.userUpdateForm.controls['id'].setValue(result.data.id)
                this.userUpdateForm.controls['email'].setValue(result.data.email)
                this.userUpdateForm.controls['fullname'].setValue(result.data.fullname)
                this.userUpdateForm.controls['company'].setValue(result.data.company)
                this.userUpdateForm.controls['positionId'].setValue(result.data.positionId)
                this.userUpdateForm.controls['industryId'].setValue(result.data.industryId)
                this.userUpdateForm.controls['version'].setValue(result.data.version)
                console.log(this.userUpdateForm.value)

            })
            this.industrySubscription = this.industryService.getAll().subscribe(result => {
                for (let i = 0; i < result.data.length; i++) {
                    this.industries.push({
                        name: result.data[i].industryName,
                        code: result.data[i].industryCode,
                        id: result.data[i].id
                    })
                }
            })
            this.positionSubscription = this.positionService.getAll().subscribe(result => {
                for (let i = 0; i < result.data.length; i++) {
                    this.positions.push({
                        name: result.data[i].positionName,
                        code: result.data[i].positionCode,
                        id: result.data[i].id
                    })
                }
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