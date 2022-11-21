import { Component } from "@angular/core";

@Component({
    selector: "user-update",
    templateUrl: "./user-update.component.html"
})
export class UserUpdateComponent {
    industries: any = [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" }
    ]
    positions: any = [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" }
    ]
}