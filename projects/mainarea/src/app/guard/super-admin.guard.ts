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
        console.log(data);
        
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