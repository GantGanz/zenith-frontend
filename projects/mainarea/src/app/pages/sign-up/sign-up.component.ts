import { Component } from "@angular/core";

@Component({
    selector: "sign-up",
    templateUrl: "./sign-up.component.html"
})
export class SignUpComponent {


    signUp = true
    accountDtl = false
    verification = false

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