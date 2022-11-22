import { Component, OnDestroy, OnInit } from "@angular/core";
import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { UsersRes } from "projects/interface/user/users-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    providers: [ConfirmationService]
})
export class UserListComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE
    position!: string

    usersRes!: UsersRes

    first = 0;
    rows = 10;

    private usersSubscription?: Subscription

    constructor(private userService: UserService, private confirmationService: ConfirmationService) { }


    ngOnInit(): void {
        this.usersSubscription = this.userService.getAll().subscribe(result => {
            this.usersRes = result
        })
    }

    clickConfirmDelete(position: string) {
        this.position = position
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            key: "positionDialog"
        });
    }

    ngOnDestroy(): void {
        this.usersSubscription?.unsubscribe()
    }
}