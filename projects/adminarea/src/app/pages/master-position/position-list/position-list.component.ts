import { Component } from "@angular/core";

@Component({
    selector: "position-list",
    templateUrl: "./position-list.component.html"
})
export class PositionListComponent {
    positions: any = [
        {
            no: "1",
            code: "P001",
            name: "Manager",
        }
    ]
}