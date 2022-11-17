import { Routes } from "@angular/router";

export const memberAreaRoutes: Routes = [
    {
        path: "home-member",
        loadChildren: () => import("./pages/member-home/home-member.module").then(u => u.HomeMemberModule)
    }
]