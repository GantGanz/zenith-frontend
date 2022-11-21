import { Component } from "@angular/core";

@Component({
    selector: "user-insert",
    templateUrl: "./user-insert.component.html"
})
export class UserInsertComponent {
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