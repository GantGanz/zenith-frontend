import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { PostsRes } from "projects/interface/post/posts-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class PostService{

    constructor(private http:HttpClient){}

    insert(data:any): Observable<InsertRes>{
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/posts`,data)
    }

    getAllRegular(): Observable<PostsRes>{
        return this.http.get<PostsRes>(`${BASE_URL.LOCALHOST}/posts/regular`)
    }
}