import { Component } from "@angular/core";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent {

    users: any = [
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        }
    ]
}