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
export class UserListComponent implements OnInit, OnDestroy {

    fileLink = BASE_URL.FILE

    usersRes!: UsersRes
<<<<<<< HEAD

    first = 0;
=======
    
>>>>>>> 8ead08d6c7597711791d306a9f48144b2f037c34
    rows = 10;

    users: any[] = []
<<<<<<< HEAD
=======

    pagination ={
        limit:0,
        offset:0
    }
>>>>>>> 8ead08d6c7597711791d306a9f48144b2f037c34

    private usersSubscription?: Subscription

    constructor(private userService: UserService) { }

    ngOnInit(): void {
<<<<<<< HEAD
        this.usersSubscription = this.userService.getAll().subscribe(result => {
=======
        this.pagination.limit = this.rows
        this.pagination.offset = this.first
        this.usersSubscription = this.userService.getAll(this.pagination).subscribe(result=>{
>>>>>>> 8ead08d6c7597711791d306a9f48144b2f037c34
            this.usersRes = result
            for (let i = 0; i < this.usersRes.data.length; i++) {
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