import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { ROLECODE } from "../constant/role";
import { ApiService } from "../service/api.service";

@Injectable({
    providedIn: 'root'
})
export class MemberGuard implements CanLoad, CanActivate {

    constructor(private apiService: ApiService, private router: Router) { }

    canActivate(): boolean {
        const data = this.apiService.getData()
        console.log("masuk active member");

        if (data) {
            const roleCode = this.apiService.getRoleCode()
            if (roleCode == ROLECODE.SUPERADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            } else if (roleCode == ROLECODE.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else {
                return true
            }
        } else {
            this.router.navigateByUrl('/member/login')
        }
        return false
    }
    
    canLoad(): boolean {
        const data = this.apiService.getData()
        console.log("masuk load member");
        if (data) {
            const roleCode = this.apiService.getRoleCode()
            if (roleCode == ROLECODE.SUPERADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            } else if (roleCode == ROLECODE.ADMIN) {
                this.router.navigateByUrl('/dashboard/admin')
            } else {
                return true
            }
            return false
        } else {
            this.router.navigateByUrl('/member/login')
            return false
        }
    }
}