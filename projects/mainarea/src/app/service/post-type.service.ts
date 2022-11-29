import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class PostTypeService{
    constructor(private http: HttpClient){}

    getIdByCode(code: string){
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/post-types/code/${code}`)
    }
}