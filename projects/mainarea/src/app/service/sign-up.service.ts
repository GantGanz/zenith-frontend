import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class SignUpService{
    constructor(private http:HttpClient){}

    sendVerification(data: any): Observable<any>{
        return this.http.post<any>(`${BASE_URL.LOCALHOST}/user-verifications/send-code`,data)
    }

    verificateCode(data: any): Observable<any>{
        return this.http.post<any>(`${BASE_URL.LOCALHOST}/user-verifications/validate`,data)
    }
}