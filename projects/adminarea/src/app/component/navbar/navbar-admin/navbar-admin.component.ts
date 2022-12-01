import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BASE_URL } from "projects/mainarea/src/app/constant/base.url";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "navbar-admin",
    templateUrl: "./navbar-admin.component.html"
})
<<<<<<< HEAD
export class NavbarAdminComponent implements OnInit{

    fileLink= BASE_URL.FILE
    fileId!:string

    constructor(private apiService:ApiService, private router:Router){}
    
    ngOnInit(): void {
        
        this.fileId = this.apiService.getPhoto()!
        console.log(this.fileId);
    }
=======
export class NavbarAdminComponent {
    constructor(private apiService: ApiService, private router: Router, private userService: UserService) { }
>>>>>>> bd41a07f579c98887d89a8e9d7cbf1ab93e97968

    private userSubscription?: Subscription

    fileLink = BASE_URL.FILE
    fileId: string | null = ''


    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.fileId = result.data.fileId
        })
    }

    logout() {
        this.apiService.logout()
        this.router.navigateByUrl('/admin/login')
    }
    ngOnDestroy(): void {
        this.userSubscription?.unsubscribe()
    }
}