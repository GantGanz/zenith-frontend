import { NgModule } from "@angular/core";
import { HomeModule } from "./pages/home/home.module";
import { PremiumModule } from "./pages/premium/premium.module";

@NgModule({
    imports: [
        HomeModule, PremiumModule, HomeModule
    ],
    exports: [
        HomeModule, PremiumModule, HomeModule
    ]
})

export class MemberAreaModule { }