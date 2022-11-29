import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { LikeRes } from "projects/interface/like/like-res";
import { UpdateRes } from "projects/interface/update-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'    
})
export class LikeService{
    
    constructor(private http: HttpClient){}

    count(id: string): Observable<number>{
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/likes/count-like/${id}`)
    }

    insert(data: any): Observable<InsertRes>{
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/likes`,data)
    }

    softDelete(data: any): Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/likes/soft-delete`,data)
    }

    update(data: any): Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/likes`,data)
    }

    liked(id: string): Observable<boolean>{
        return this.http.get<boolean>(`${BASE_URL.LOCALHOST}/likes/liked/${id}`)
    }

    getId(id: string): Observable<any>{
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/likes/liked-id/${id}`)
    }

    delete(id: string): Observable<string>{
        return this.http.delete<string>(`${BASE_URL.LOCALHOST}/likes/${id}`)
    }
}