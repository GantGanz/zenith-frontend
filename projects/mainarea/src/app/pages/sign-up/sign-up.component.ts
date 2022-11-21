import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MenuItem } from 'primeng/api';
import { Subscription } from "rxjs";
import { SignUpService } from "../../service/sign-up.service";
import { UserService } from "../../service/user.service";
import { PositionsRes } from "../../../../../interface/position/positions-res";
import { PositionService } from "../../service/position.service";


@Component({
    selector: "sign-up",
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit, OnDestroy {

    signUp = true
    accountDtl = false
    verification = false
    verificationSuccess = false
    signUpView = true

    positionsRes!: PositionsRes
    positions: any[] =[]
    
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


    private sendVerificationSubscription?: Subscription
    private verificateCodeSubscription?: Subscription
    private registerSubscription?: Subscription
    private positionsSubscription?: Subscription

    constructor(private fb: FormBuilder, private signUpService: SignUpService,
        private userService: UserService, private positionService: PositionService) { }

    ngOnInit(): void {

        this.items = [
            { label: "Sign Up" },
            { label: "Account Detail" },
            { label: "Verification" }
        ]

        this.positionsSubscription = this.positionService.getAll().subscribe(result=>{
            this.positionsRes = result     
            for(let i=0;i<this.positionsRes.data.length;i++){
                this.positions.push({name:this.positionsRes.data[i].industryName, code: this.positionsRes.data[i].industryCode, id: this.positionsRes.data[i].id})
            }
        })
    }
 
    industries: any = [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" }
    ]

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
        this.sendVerificationSubscription = this.signUpService.sendVerification(this.registerForm.value.email).subscribe(() => {
        })
        console.log(this.registerForm.value)
        
    }

    clickVerify() {
        this.verificationCode.addControl('email', this.fb.control(this.registerForm.value.email, [Validators.required]))
        this.verificateCodeSubscription = this.signUpService.verificateCode(this.verificationCode.value).subscribe(u => {
            if (u) {
                this.registerSubscription = this.userService.register(this.registerForm.value).subscribe(() => { })
            }
        })
    }

    ngOnDestroy(): void {
        this.sendVerificationSubscription?.unsubscribe()
        this.verificateCodeSubscription?.unsubscribe()
        this.registerSubscription?.unsubscribe()
        this.positionsSubscription?.unsubscribe()
    }
}