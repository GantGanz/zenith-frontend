import { Component } from "@angular/core";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html"
})
export class UserListComponent {

    first = 0;
    rows = 10;

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
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "1",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        },
        {
            no: "10",
            fullName: "Purnama Fatimah S.Pd",
            email: "purnama@gmail.com",
            company: "Lawencon",
            industry: "Healthcare and Social Assistance",
            position: "Manager",
            role: "Admin",
            profilePic: "../../../../assets/images/photo1.png",
        }
    ]


    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.users ? this.first === (this.users.length - this.rows) : true;
    }

    isFirstPage(): boolean {
        return this.users ? this.first === 0 : true;
    }
}