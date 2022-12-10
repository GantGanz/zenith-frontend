import { Component } from "@angular/core"
import { Validators, FormBuilder } from "@angular/forms"
import { ActivatedRoute } from "@angular/router"
import { IndustryData } from "projects/interface/industry/industry-data"
import { PositionData } from "projects/interface/position/position-data"
import { ROLENAME } from "projects/mainarea/src/app/constant/role"
import { IndustryService } from "projects/mainarea/src/app/service/industry.service"
import { PositionService } from "projects/mainarea/src/app/service/position.service"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: "user-update",
    templateUrl: "./user-update.component.html"
})
export class UserUpdateComponent {

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

    positions: PositionData[] = []
    industries: IndustryData[] = []

    memberRole = ROLENAME.MEMBER

    disable = false
    loading = false

    private industrySubscription?: Subscription
    private userSubscription?: Subscription
    private positionSubscription?: Subscription
    private paramSubscription?: Subscription
    private updateSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private active: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.userSubscription = this.userService.getById(id).subscribe(result => {
                this.userUpdateForm.patchValue(result.data)

                if (this.memberRole == result.data.roleName) {
                    this.disable = false
                } else {
                    this.disable = true
                }
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
        this.loading = true
        this.updateSubscription = this.userService.update(this.userUpdateForm.value).pipe(finalize(() => this.loading = false)).subscribe(() => this.init())
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
        this.industrySubscription?.unsubscribe()
        this.positionSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
    }
}