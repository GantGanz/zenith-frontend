import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { IndustryService } from "projects/mainarea/src/app/service/industry.service"
import { PositionService } from "projects/mainarea/src/app/service/position.service"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: "user-insert",
    templateUrl: "./user-insert.component.html"
})
export class UserInsertComponent implements OnInit, OnDestroy {

    userInsertForm = this.fb.group({
        id: [null, [Validators.required]],
        fullname: [null, [Validators.required, Validators.maxLength(50)]],
        email: [null, [Validators.email, Validators.required, Validators.maxLength(50)]]
    })

    submitLoading = false

    industries: any = []
    positions: any = []

    private industrySubscription?: Subscription
    private userInsertSubscription?: Subscription
    private positionSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private fb: FormBuilder, private router: Router,
        private title: Title) {
        this.title.setTitle('New User | Zenith')
    }

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
        this.submitLoading = true
        this.userInsertSubscription = this.userService.insert(this.userInsertForm.value).pipe(finalize(() => this.submitLoading = false)).subscribe(() => {
            this.router.navigateByUrl('/users/list')
        })
    }

    ngOnDestroy(): void {
        this.industrySubscription?.unsubscribe()
        this.positionSubscription?.unsubscribe()
        this.userInsertSubscription?.unsubscribe()
    }
}