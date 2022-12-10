import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "projects/mainarea/src/app/service/api.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "change-password",
    templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

    private updateSubscription?: Subscription
    private paramSubscription?: Subscription
    private userSubscription?: Subscription

    constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private apiService: ApiService, private active: ActivatedRoute, private toast: ToastrService,
        private title: Title) { this.title.setTitle('Change Password | Zenith')}

    userUpdateForm = this.fb.group({
        id: [''],
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        version: [0, [Validators.required]]
    })

    clickBack() {
        this.router.navigateByUrl("/profile")
    }

    ngOnInit(): void {
        this.userSubscription = this.userService.getByPrincipal().subscribe(result => {
            this.userUpdateForm.controls['version'].setValue(result.data.version)
        })
        this.router.url == `./profile/change-password/${this.userUpdateForm.value.id}`
    }

    clickUpdate() {
        if (this.userUpdateForm.value.confirmPassword == this.userUpdateForm.value.newPassword) {
            this.updateSubscription = this.userService.changePassword(this.userUpdateForm.value).subscribe(result=>{
                this.userUpdateForm.reset()
                this.userUpdateForm.controls['version'].setValue(result.data.version)
            })
        } else {
            this.toast.warning("Confirm password doesn't match");
        }
    }

    ngOnDestroy(): void {
        this.updateSubscription?.unsubscribe()
        this.paramSubscription?.unsubscribe()
        this.userSubscription?.unsubscribe()
    }
}