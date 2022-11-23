import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { UpdateRes } from "projects/interface/update-res";
import { UserRes } from "projects/interface/user/user-res";
import { UsersRes } from "projects/interface/user/users-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    register(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/users/register`, data)
    }

    getAll(offset:number, limit:number): Observable<UsersRes> {
        return this.http.get<UsersRes>(`${BASE_URL.LOCALHOST}/users?offset=${offset}&limit=${limit}`)
    }

    insert(data: any): Observable<InsertRes>{
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/users`,data)
    }

    getById(id: string): Observable<UserRes>{
        return this.http.get<UserRes>(`${BASE_URL.LOCALHOST}/users/${id}`)
    }

    update(data: any):Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/users`,data)
    }

    countMember():Observable<number>{
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/users/count-member`)
    }

    countAdmin():Observable<number>{
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/users/count-admin`)
    }

    countPremium():Observable<number>{
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/users/count-premium`)
    }

    countUser(): Observable<number>{
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/users/count`)
    }
}