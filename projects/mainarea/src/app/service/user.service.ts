import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { UsersRes } from "projects/interface/user/users-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class UserService{
    constructor(private http:HttpClient){}

    register(data:any):Observable<InsertRes>{
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/users/register`,data)
    }

    getAll(): Observable<UsersRes>{
        return this.http.get<UsersRes>(`${BASE_URL.LOCALHOST}/users`)
    }
}