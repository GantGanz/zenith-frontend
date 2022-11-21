import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PositionInsertComponent } from "./position-insert/position-insert.component";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionUpdateComponent } from "./position-update/position-update.component";
import { PositionRouting } from "./position.routing";
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button'


@NgModule({
    declarations: [
        PositionListComponent, PositionInsertComponent, PositionUpdateComponent
    ],
    imports: [
        RouterModule,
        PositionRouting,
        TooltipModule,
        InputTextModule,
        TableModule,
        ButtonModule
    ],
    exports: [
        PositionListComponent, PositionInsertComponent, PositionUpdateComponent
    ]
})
export class PositionModule { }