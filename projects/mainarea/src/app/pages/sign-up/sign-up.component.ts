import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MenuItem } from 'primeng/api';
import { finalize, Subscription } from "rxjs";
import { SignUpService } from "../../service/sign-up.service";
import { UserService } from "../../service/user.service";
import { PositionsRes } from "../../../../../interface/position/positions-res";
import { PositionService } from "../../service/position.service";
import { IndustriesRes } from "projects/interface/industry/industries-res";
import { IndustryService } from "../../service/industry.service";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "sign-up",
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit, OnDestroy {

    private sendVerificationSubscription?: Subscription
    private verificateCodeSubscription?: Subscription
    private registerSubscription?: Subscription
    private positionsSubscription?: Subscription
    private industriesSubscription?: Subscription

    signUp = true
    accountDtl = false
    verification = false
    verificationSuccess = false
    signUpView = true

    positionsRes!: PositionsRes
    industriesRes!: IndustriesRes

    positions: any[] = []
    industries: any[] = []

    stepsIndex: number = 0
    items: MenuItem[] = []

    verifyLoading = false
    positionLoading = false
    industryLoading = false
    sendVerificationLoading = false

    registerForm = this.fb.group({
        fullname: ['' || null, [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator]],
        email: ['' || null, [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['' || null, [Validators.required, this.noWhitespaceValidator]],
        confirmPassword: ['' || null, [Validators.required]],
        company: ['' || null, [Validators.required, this.noWhitespaceValidator]],
        industryId: ['' || null, [Validators.required]],
        positionId: ['' || null, [Validators.required]]
    })

    verificationCode: any = this.fb.group({
        verificationCode: ['', [Validators.required]],
    })

    constructor(private fb: FormBuilder, private signUpService: SignUpService,
        private userService: UserService, private positionService: PositionService,
        private industryService: IndustryService, private toast: ToastrService) { }

    ngOnInit(): void {
        this.positionLoading = true
        this.industryLoading = true
        this.items = [
            { label: "Sign Up" },
            { label: "Account Detail" },
            { label: "Verification" }
        ]

        this.positionsSubscription = this.positionService.getAll().subscribe(result => {
            this.positionsRes = result
            for (let i = 0; i < this.positionsRes.data.length; i++) {
                this.positions.push({
                    name: this.positionsRes.data[i].positionName,
                    code: this.positionsRes.data[i].positionCode,
                    id: this.positionsRes.data[i].id
                })
            }
            this.positionLoading = false
        })
        this.industriesSubscription = this.industryService.getAll().subscribe(result => {
            this.industriesRes = result
            for (let i = 0; i < this.industriesRes.data.length; i++) {
                this.industries.push({
                    name: this.industriesRes.data[i].industryName,
                    code: this.industriesRes.data[i].industryCode,
                    id: this.industriesRes.data[i].id
                })
            }
            this.industryLoading = false
        })
    }

    clickSignUp() {
        if (this.registerForm.controls['fullname'].invalid || this.registerForm.controls['email'].invalid
            || this.registerForm.controls['password'].invalid || this.registerForm.controls['confirmPassword'].invalid) {
            this.registerForm.controls['fullname'].markAsTouched()
            this.registerForm.controls['email'].markAsTouched()
            this.registerForm.controls['password'].markAsTouched()
            this.registerForm.controls['confirmPassword'].markAsTouched()
        } else {
            if (this.registerForm.value.confirmPassword == this.registerForm.value.password) {
                this.accountDtl = true
                this.signUp = false
                this.verification = false
                this.stepsIndex += 1
            } else {
                this.toast.warning("Confirm password doesn't match");
            }
        }
    }

    clickAccountDtl() {
        this.sendVerificationLoading = true
        if (this.registerForm.controls['company'].invalid || this.registerForm.controls['industryId'].invalid
            || this.registerForm.controls['positionId'].invalid) {
            this.registerForm.controls['company'].markAsTouched()
            this.registerForm.controls['industryId'].markAsTouched()
            this.registerForm.controls['positionId'].markAsTouched()
            this.sendVerificationLoading = false
        } else {
            this.sendVerificationSubscription = this.signUpService.sendVerification(this.registerForm.value.email).pipe(finalize(() => this.sendVerificationLoading = false)).subscribe(() => {
                this.accountDtl = false
                this.signUp = false
                this.verification = true
                this.stepsIndex += 1
            })
        }
    }

    clickVerify() {
        this.verifyLoading = true
        if (this.verificationCode.invalid) {
            this.verificationCode.markAllAsTouched();
            this.verifyLoading = false
        } else {
            this.verificationCode.addControl('email', this.fb.control(this.registerForm.value.email, [Validators.required]))
            this.verificateCodeSubscription = this.signUpService.verificateCode(this.verificationCode.value).pipe(finalize(() => this.verifyLoading = false)).subscribe(u => {
                if (u) {
                    this.registerSubscription = this.userService.register(this.registerForm.value).subscribe(s => {
                        if (s) {
                            this.signUpView = false
                            this.verificationSuccess = true
                        }
                    })
                }
            })
        }
    }

    noWhitespaceValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    }

    ngOnDestroy(): void {
        this.sendVerificationSubscription?.unsubscribe()
        this.verificateCodeSubscription?.unsubscribe()
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.industriesSubscription?.unsubscribe()
    }
}