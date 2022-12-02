import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { PostRes } from "projects/interface/post/post-res";
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

    getAll(offset:number,limit:number){
        return this.http.get<PostsRes>(`${BASE_URL.LOCALHOST}/posts?offset=${offset}&limit=${limit}`)
    }

    getAllLiked(offset: number, limit: number){
        return this.http.get<PostsRes>(`${BASE_URL.LOCALHOST}/posts/liked?offset=${offset}&limit=${limit}`)
    }

    getAllBookmarked(offset:number, limit:number){
        return this.http.get<PostsRes>(`${BASE_URL.LOCALHOST}/posts/bookmarked?offset=${offset}&limit=${limit}`)
    }

    countAll(){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/posts/count-all`)
    }

    countMyPosts(){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/posts/count-my-posts`)
    }

    countLiked(){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/posts/count-liked`)
    }

    countBookmarked(){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/posts/count-bookmarked`)
    }
}