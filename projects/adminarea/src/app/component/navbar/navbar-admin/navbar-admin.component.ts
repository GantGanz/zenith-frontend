import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "projects/mainarea/src/app/service/api.service";

@Component({
    selector: "navbar-admin",
    templateUrl: "./navbar-admin.component.html"
})
export class NavbarAdminComponent {
    constructor(private apiService:ApiService, private router:Router){}

    logout(){
        this.apiService.logout()
        this.router.navigateByUrl('/admin/login')
    }
}