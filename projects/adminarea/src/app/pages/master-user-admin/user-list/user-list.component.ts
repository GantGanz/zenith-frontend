import { Component, OnDestroy, OnInit } from "@angular/core"
import { ConfirmationService, LazyLoadEvent, PrimeNGConfig } from "primeng/api"
import { UsersRes } from "projects/interface/user/users-res"
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url"
import { UserService } from "projects/mainarea/src/app/service/user.service"
import { shareReplay, Subscription } from "rxjs"

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    providers: [ConfirmationService]
})
export class UserListComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE
    position!: string

    usersRes!: UsersRes

    first = 0
    rows = 10

    limit = this.rows
    totalUsers!: number

    private usersSubscription?: Subscription
    private pageChangeSubscription?: Subscription
    private countSubscription?: Subscription

    constructor(private userService: UserService, private confirmationService: ConfirmationService) { }


    ngOnInit(): void {
        this.usersSubscription = this.userService.getAll(this.first, this.limit).subscribe(result => {
            this.usersRes = result
        })
        this.countSubscription = this.userService.countUser().subscribe(result => {
            this.totalUsers = result
        })
    }
    
    clickConfirmDelete(position: string, id: string) {
        this.position = position
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: "positionDialog"
        });
    }

    getData(offset: number, limit:number){
        this.pageChangeSubscription = this.userService.getAll(offset, limit).subscribe(result => {
            this.usersRes = result
        })
    }
    
    loadData(event: LazyLoadEvent) {
        this.getData(event.first!, event.rows!)
    }
    
    ngOnDestroy(): void {
        this.pageChangeSubscription?.unsubscribe()
        this.usersSubscription?.unsubscribe()
        this.countSubscription?.unsubscribe()
    }
}