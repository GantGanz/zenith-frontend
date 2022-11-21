import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IndustriesRes } from "projects/interface/industry/industries-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class IndustryService{
    constructor(private http:HttpClient){}

    getAll():Observable<IndustriesRes>{
        return this.http.get<IndustriesRes>(`${BASE_URL.LOCALHOST}/industries`)
    }
}