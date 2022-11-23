import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router"
import { PremiumComponent } from "./premium.component"
import { PremiumRouting } from "./premium.routing"
import { ButtonModule } from "primeng/button"
import { CommonModule } from "@angular/common"
import { DividerModule } from 'primeng/divider'
import { FileUploadModule } from 'primeng/fileupload'
import { HttpClientModule } from '@angular/common/http'


@NgModule({
    declarations: [
        PremiumComponent
    ],
    imports: [
        RouterModule, CommonModule, PremiumRouting,
        ButtonModule,
        DividerModule,
        FileUploadModule,
        HttpClientModule
    ],
    exports: [
        PremiumComponent
    ]
})
export class PremiumModule {

}