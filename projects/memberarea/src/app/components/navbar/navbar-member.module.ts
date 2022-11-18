import { NgModule } from "@angular/core";
import { TabMenuModule } from 'primeng/tabmenu'
import { MenuModule } from 'primeng/menu'
import { MenubarModule } from 'primeng/menubar'
import { DropdownModule } from 'primeng/dropdown'
import { RouterModule } from "@angular/router";
import { NavbarMemberComponent } from "./navbar-member.component";
import { FooterComponent } from "../footer/footer.component";
import { ImageModule } from 'primeng/image';


@NgModule({
    declarations: [
        NavbarMemberComponent, FooterComponent
    ],
    imports: [
        RouterModule,
        TabMenuModule,
        MenuModule,
        MenubarModule,
        DropdownModule,
        ImageModule
    ],
    exports: [
        NavbarMemberComponent, FooterComponent
    ]
})
export class NavbarMemberModule { }