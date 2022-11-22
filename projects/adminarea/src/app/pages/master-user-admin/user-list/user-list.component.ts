import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersRes } from "projects/interface/user/users-res";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit, OnDestroy{
  
    fileLink = BASE_URL.FILE

    usersRes!: UsersRes
    
    rows = 10;
    first= 0;

    pagination ={
        limit:0,
        offset:0
    }

    private usersSubscription?: Subscription

    constructor(private userService: UserService){}
  
    ngOnInit(): void {
        this.usersSubscription = this.userService.getAll().subscribe(result=>{
            this.usersRes = result
        })
    }

    ngOnDestroy(): void {
        this.usersSubscription?.unsubscribe()
    }
}