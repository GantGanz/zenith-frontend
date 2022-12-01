import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ConfirmationService, LazyLoadEvent, PrimeNGConfig } from "primeng/api"
import { UsersRes } from "projects/interface/user/users-res"
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { finalize, Subscription } from "rxjs"

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    providers: [ConfirmationService]
})
export class UserListComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE
    position: string = 'top'

    loading = false

    first = 0
    rows = 10

    limit = this.rows
    totalUsers!: number

    users: any[] = []

    private usersSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription
    private deleteSubscription?: Subscription

    userDelete = this.fb.group({
        id: ['', [Validators.required]],
        version: [0, [Validators.required]]
    })

    constructor(private userService: UserService, private confirmationService: ConfirmationService,
        private fb: FormBuilder) { }


    ngOnInit(): void {
        this.init()
    }

    init() {
        this.usersSubscription = this.userService.getAll(this.first, this.limit).subscribe(result => {
            this.users = []
            for (let i = 0; i < result.data.length; i++) {
                this.users.push(result.data[i])
            }
        })
        this.countSubscription = this.userService.countUser().subscribe(result => {
            this.totalUsers = result
        })
    }

    clickConfirmDelete(id: string, version: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: "positionDialog",
            accept: () => {
                this.loading = true
                this.userDelete.controls['id'].setValue(id)
                this.userDelete.controls['version'].setValue(version)
                this.deleteSubscription = this.userService.softDelete(this.userDelete.value).pipe(finalize(() => this.loading = false)).subscribe(u => {
                    this.init()
                })
            }
        });
    }

    getData(offset: number, limit: number) {
        this.pageChangeSubscription = this.userService.getAll(offset, limit).subscribe(result => {
            this.users = []
            for (let i = 0; i < result.data.length; i++) {
                this.users.push(result.data[i])
            }
        })
    }

    loadData(event: LazyLoadEvent) {
        this.getData(event.first!, event.rows!)
    }

    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.usersSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
        this.deleteSubscription?.unsubscribe()
    }
}