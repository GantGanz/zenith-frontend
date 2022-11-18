import { Component, OnInit } from "@angular/core";
import { MenuItem } from 'primeng/api';


@Component({
    selector: "sign-up",
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent implements OnInit {

    signUp = true
    accountDtl = false
    verification = false

    items: MenuItem[] = []

    ngOnInit(): void {
        this.items = [
            { label: "Sign Up" },
            { label: "Account Detail" },
            { label: "Verification" }
        ]
    }

    industries: any = [
        { name: "ddddd" },
        { name: "ddddd" },
        { name: "ddddd" },
        { name: "ddddd" }
    ]

    positions: any = [
        { name: "Position 1" },
        { name: "Position 2" },
        { name: "Position 3" },
        { name: "Position 4" }
    ]

    clickSignUp() {
        this.accountDtl = true
        this.signUp = false
        this.verification = false
    }
    clickAccountDtl() {
        this.accountDtl = false
        this.signUp = false
        this.verification = true
    }
}