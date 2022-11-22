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
    
    users: any[] = []

    pagination ={
        limit:0,
        offset:0
    }

    private usersSubscription?: Subscription

    constructor(private userService: UserService){}
  
    ngOnInit(): void {
        this.pagination.limit = this.rows
        this.pagination.offset = this.first
        this.usersSubscription = this.userService.getAll(this.pagination).subscribe(result=>{
            this.usersRes = result
            for(let i=0;i<this.usersRes.data.length;i++){
                this.users.push({
                    id: this.usersRes.data[i].id,
                    name: this.usersRes.data[i].fullname,
                    email: this.usersRes.data[i].email,
                    company: this.usersRes.data[i].company,
                    industry: this.usersRes.data[i].industryName,
                    position: this.usersRes.data[i].positionName,
                    role: this.usersRes.data[i].roleName,
                    file: this.usersRes.data[i].fileId
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.usersSubscription?.unsubscribe()
    }
}