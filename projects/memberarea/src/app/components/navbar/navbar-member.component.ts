import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";

@Component({
    selector: "navbar-member",
    templateUrl: "navbar-member.component.html"
})

export class NavbarMemberComponent implements OnInit{

    fileLink = BASE_URL.FILE
    fileId!: string

    constructor(private apiService:ApiService, private router:Router){}

    ngOnInit(): void {
        this.fileId = this.apiService.getPhoto()!
    }

    logout(){
        this.apiService.logout()
        this.router.navigateByUrl('/member/login')
    }


}