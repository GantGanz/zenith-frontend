import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";

@Component({
    selector: "navbar-super-admin",
    templateUrl: "./navbar-super-admin.component.html",
})
export class NavbarSuperAdminComponent implements OnInit {
    constructor(private apiService: ApiService, private router:Router) { }
    
    fileLink=BASE_URL.FILE
    fileId: string | null = ''

    ngOnInit(): void {
        this.fileId = this.apiService.getPhoto()
    }
    
    logout(){
        this.apiService.logout()
        this.router.navigateByUrl('/admin/login')
    }
}