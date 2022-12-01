import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { ROLECODE } from "../constant/role";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn: 'root'
})
export class SuperAdminGuard implements CanLoad, CanActivate {

    constructor(private router: Router, private apiService: ApiService) { }

    canActivate(): boolean {
        const data = this.apiService.getData()
        console.log("masuk active super-admin");
        
        if(data){
            const roleCode=this.apiService.getRoleCode()
            if(roleCode==ROLECODE.SUPERADMIN){
                return true
            }else if(roleCode == ROLECODE.ADMIN){
                this.router.navigateByUrl('/dashboard/admin')
            }else{
                this.router.navigateByUrl('/feed')
            }
        }else{
            this.router.navigateByUrl('/member/login')
        }
        return false
    }
    canLoad(): boolean {
        console.log("masuk load super-admin");
        const roleCode=this.apiService.getRoleCode()
        if(roleCode==ROLECODE.SUPERADMIN){
            return true
        }else if(roleCode == ROLECODE.ADMIN){
            this.router.navigateByUrl('/dashboard/admin')
        }else{
            this.router.navigateByUrl('/feed')
        }
        return false
    }
}