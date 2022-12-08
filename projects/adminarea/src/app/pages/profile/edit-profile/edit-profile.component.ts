import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormArray, FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { IndustryData } from "projects/interface/industry/industry-data"
import { PositionData } from "projects/interface/position/position-data"
import { UserData } from "projects/interface/user/user-data"
import { UserRes } from "projects/interface/user/user-res"
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url"
import { FileService } from "projects/mainarea/src/app/service/file.service"
import { IndustryService } from "projects/mainarea/src/app/service/industry.service"
import { PositionService } from "projects/mainarea/src/app/service/position.service"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: "edit-profile",
    templateUrl: "edit-profile.component.html"
})

export class EditProfileComponent implements OnInit, OnDestroy {

    backToSuperAdminProfile = false
    backToAdminProfile = false
    userData !: UserData

    userLoaded = false

    company!: string

    fileLink = BASE_URL.FILE
    fileId!: string

    userUpdateForm = this.fb.group({
        id: ['', [Validators.required]],
        fullname: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
        company: ['', [Validators.required]],
        fileCodes: [''],
        extension: [''],
        positionId: ['', [Validators.required]],
        industryId: ['', [Validators.required]],
        isActive: [true, [Validators.required]],
        version: [0, [Validators.required]]
    })

    positions: PositionData[] = []
    industries: IndustryData[] = []

    selectedPosition!: PositionData

    private industrySubscription?: Subscription
    private userSubscription?: Subscription
    private positionSubscription?: Subscription
    private paramSubscription?: Subscription
    private updateSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private active: ActivatedRoute,
        private fb: FormBuilder, private router: Router, private fileService: FileService) { }

    ngOnInit(): void {
        this.init()
    }

    init() {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.userSubscription = this.userService.getByPrincipal().pipe(finalize(() => this.userLoaded = true)).subscribe(result => {
                this.userUpdateForm.patchValue(
                    result.data
                )
                this.userData = result.data
                this.userUpdateForm.controls['company'].disable()
                this.userUpdateForm.controls['positionId'].disable()
                this.userUpdateForm.controls['industryId'].disable()
                this.fileId = result.data.fileId
            })
            this.industrySubscription = this.industryService.getAll().subscribe(result => {
                this.industries = result.data
            })
            this.positionSubscription = this.positionService.getAll().subscribe(result => {
                this.positions = result.data

                console.log(this.positions);
                if (this.router.url == `/super-admin/profiles/edit/${this.userUpdateForm.value.id}`) {
                    this.backToSuperAdminProfile = true
                }
                else if (this.router.url == `/admin/profiles/edit/${this.userUpdateForm.value.id}`) {
                    this.backToAdminProfile = true
                }
            })
        })
        if (this.router.url == `/super-admin/profiles/edit/${this.userUpdateForm.value.id}`) {
            this.backToSuperAdminProfile = true
        }
        else if (this.router.url == `/admin/profiles/edit/${this.userUpdateForm.value.id}`) {
            this.backToAdminProfile = true
        }
    }

    clickUpdate() {
        this.userUpdateForm.controls['company'].enable()
        this.userUpdateForm.controls['positionId'].enable()
        this.userUpdateForm.controls['industryId'].enable()
        this.updateSubscription = this.userService.update(this.userUpdateForm.value).subscribe(() => this.init())
    }

    fileUpload(event: any) {
        this.fileService.fileUploadMulti(event).then(result => {
            this.userUpdateForm.controls['fileCodes'].setValue(result[0][1])
            this.userUpdateForm.controls['extension'].setValue(result[0][0])
        })
    }

    ngOnDestroy(): void {
        this.paramSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
        this.industrySubscription?.unsubscribe()
        this.positionSubscription?.unsubscribe()
        this.updateSubscription?.unsubscribe()
    }
}