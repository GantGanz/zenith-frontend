import { NgModule } from "@angular/core";
import { HomeModule } from "./pages/home/home.module";
import { PremiumModule } from "./pages/premium/premium.module";

@NgModule({
    imports: [
        HomeModule, PremiumModule
    ],
    exports: [
        HomeModule, PremiumModule
    ]
})

export class MemberAreaModule { }