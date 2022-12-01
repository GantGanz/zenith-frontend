import { Injectable } from "@angular/core"
import { CanActivate, Router} from "@angular/router"
import { ROLECODE } from "../constant/role"
import { ApiService } from "../service/api.service"
@Injectable({
    providedIn: 'root'
})
export class CanActiveAuth implements CanActivate {

    constructor(private router:Router, private apiService:ApiService){}

    canActivate(): boolean {
        const data = this.apiService.getData()
        if(data){
            const roleCode = this.apiService.getRoleCode()
            if (roleCode == ROLECODE.SUPERADMIN) {
                this.router.navigateByUrl('/dashboard/super-admin')
            }else if(roleCode == ROLECODE.ADMIN){
                this.router.navigateByUrl('/dashboard/admin')
            }else{
                this.router.navigateByUrl('/feed')
            }
            return false
        }else{
            return true
        }
    }

}