import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MenuItem } from 'primeng/api';
import { Subscription } from "rxjs";
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

    registerForm = this.fb.group({
        fullname: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        password: ['', [Validators.required]],
        company: ['', [Validators.required]],
        industry: ['', [Validators.required]],
        position: ['', [Validators.required]]
    })

    verificationCode: any = this.fb.group({
        verificationCode: ['', [Validators.required]],
    })

    constructor(private fb: FormBuilder, private signUpService: SignUpService,
        private userService: UserService, private positionService: PositionService,
        private industryService: IndustryService, private toast: ToastrService) { }

    ngOnInit(): void {

        this.items = [
            { label: "Sign Up" },
            { label: "Account Detail" },
            { label: "Verification" }
        ]

        this.positionsSubscription = this.positionService.getAll().subscribe(result => {
            this.positionsRes = result
            for (let i = 0; i < this.positionsRes.data.length; i++) {
                this.positions.push({
                    name: this.positionsRes.data[i].industryName,
                    code: this.positionsRes.data[i].industryCode,
                    id: this.positionsRes.data[i].id
                })
            }
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
        })
    }

    clickSignUp() {
        this.accountDtl = true
        this.signUp = false
        this.verification = false
        this.stepsIndex += 1
    }

    clickAccountDtl() {
        this.accountDtl = false
        this.signUp = false
        this.verification = true
        this.stepsIndex += 1
        this.sendVerificationSubscription = this.signUpService.sendVerification(this.registerForm.value.email).subscribe(() => {
        })
        console.log(this.registerForm.value)

    }

    clickVerify() {
        this.verificationCode.addControl('email', this.fb.control(this.registerForm.value.email, [Validators.required]))
        this.verificateCodeSubscription = this.signUpService.verificateCode(this.verificationCode.value).subscribe(u => {
            if (u) {
                this.registerSubscription = this.userService.register(this.registerForm.value).subscribe(() => { })
                this.signUpView = false
                this.verificationSuccess = true
            }
        })
    }

    ngOnDestroy(): void {
        this.sendVerificationSubscription?.unsubscribe()
        this.verificateCodeSubscription?.unsubscribe()
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
        this.industriesSubscription?.unsubscribe()
    }
}