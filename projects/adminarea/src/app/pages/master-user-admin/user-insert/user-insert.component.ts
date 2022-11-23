import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { IndustryService } from "projects/mainarea/src/app/service/industry.service"
import { PositionService } from "projects/mainarea/src/app/service/position.service"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { Subscription } from "rxjs"

@Component({
    selector: "user-insert",
    templateUrl: "./user-insert.component.html"
})
export class UserInsertComponent implements OnInit, OnDestroy {

    userInsertForm = this.fb.group({
        id: ['', [Validators.required]],
        fullname: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
        company: ['', [Validators.required]],
        positionId: ['', [Validators.required]],
        industryId: ['', [Validators.required]],
    })

    industries: any = []
    positions: any = []

    private industrySubscription?: Subscription
    private userInsertSubscription?: Subscription
    private positionSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.industrySubscription = this.industryService.getAll().subscribe(industry => {
            for (let i = 0; i < industry.data.length; i++) {
                this.industries.push({
                    name: industry.data[i].industryName,
                    code: industry.data[i].industryCode,
                    id: industry.data[i].id
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
    }

    clickInsert() {
        console.log(this.userInsertForm.value);

        this.userInsertSubscription = this.userService.insert(this.userInsertForm.value).subscribe(() => {
            this.router.navigateByUrl('/users/list')
        })
    }

    ngOnDestroy(): void {
        this.industrySubscription?.unsubscribe()
        this.positionSubscription?.unsubscribe()
        this.userInsertSubscription?.unsubscribe()
    }
}