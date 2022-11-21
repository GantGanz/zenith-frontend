import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResDto } from "projects/interface/login/login-res-dto";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class LoginService{
    constructor(private http: HttpClient){}

    login(data: any): Observable<LoginResDto>{
        return this.http.post<LoginResDto>(`${BASE_URL.LOCALHOST}/login`,data)
    }
}