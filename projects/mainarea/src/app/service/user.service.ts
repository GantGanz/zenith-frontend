import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http:HttpClient){}

    register(data:any):Observable<any>{
        return this.http.post<any>(`${BASE_URL.LOCALHOST}/users/register`,data)
    }
}