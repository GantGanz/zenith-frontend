import { Component, OnInit } from "@angular/core";
import { MenuItem, PrimeNGConfig } from 'primeng/api';



@Component({
    selector: "activity-list",
    templateUrl: "./activity-list.component.html",
    styleUrls: ["activity-list.component.css"]
})

export class ActivityListComponent {


    items: any = [
        { label: 'Update', icon: 'pi pi-fw pi-plus' },
        { label: 'Delete', icon: 'pi pi-fw pi-download' }
    ]
}