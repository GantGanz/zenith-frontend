import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { finalize, Subscription } from "rxjs";
import { ROLECODE } from "../../constant/role";
import { ApiService } from "../../service/api.service";
import { LoginService } from "../../service/login.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})

export class LoginComponent implements OnInit, OnDestroy {

    loading = false

    loginSubscription?: Subscription

    memberLogin = true

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [Validators.required]]
    })

    constructor(private router: Router, private loginService: LoginService,
        private apiService: ApiService, private fb: FormBuilder, private toast: ToastrService) { }

    ngOnInit(): void {
        if (this.router.url == "/admin/login")
            this.memberLogin = false
    }

    submit() {
        this.loading = true
        this.loginSubscription = this.loginService.login(this.loginForm.value).pipe(finalize(() => this.loading = false)).subscribe(result => {
            if (this.memberLogin) {
                if (result.roleCode == ROLECODE.MEMBER) {
                    this.apiService.saveData(result)
                    this.router.navigateByUrl("/feed")
                } else {
                    this.toast.error("Unauthorized Login", "Information")
                }
            } else {
                if (result.roleCode == ROLECODE.SUPERADMIN) {
                    this.apiService.saveData(result)
                    this.router.navigateByUrl("/dashboard/super-admin")
                } else if (result.roleCode == ROLECODE.ADMIN) {
                    this.apiService.saveData(result)
                    this.router.navigateByUrl("/dashboard/admin")
                } else {
                    this.toast.error("Unauthorized Login", "Information")
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.loginSubscription?.unsubscribe()
    }
}