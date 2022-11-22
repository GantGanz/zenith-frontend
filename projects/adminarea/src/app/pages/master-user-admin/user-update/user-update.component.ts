import { Component } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IndustryService } from "projects/mainarea/src/app/service/industry.service";
import { PositionService } from "projects/mainarea/src/app/service/position.service";
import { UserService } from "projects/mainarea/src/app/service/user.service";
import { Subscription } from "rxjs";

@Component({
    selector: "user-update",
    templateUrl: "./user-update.component.html"
})
export class UserUpdateComponent {
    
    userInsertForm = this.fb.group({
        id:['',Validators.required],
        fullname:['',Validators.required,Validators.maxLength(50)],
        email:['',Validators.email,Validators.required, Validators.maxLength(50)],
        company:['',Validators.required],
        fileCodes:[''],
        extension:[''],
        positionId:['',Validators.required],
        industryId:['',Validators.required],
        isActive:['',Validators.required],
        version:['',Validators.required]
    })


    private industrySubscription?: Subscription
    private userSubscription?: Subscription
    private positionSubscription?: Subscription
    private paramSubscription?: Subscription

    constructor(private industryService: IndustryService, private positionService: PositionService,
        private userService: UserService, private active: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.paramSubscription = this.active.params.subscribe(u => {
            const id = String(Object.values(u))
            this.userSubscription = this.userService.getById(id).subscribe(result=>{
                
            })
        })
    }
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
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