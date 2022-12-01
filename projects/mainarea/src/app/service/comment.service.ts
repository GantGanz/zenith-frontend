import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommentsRes } from "projects/interface/comment/comments-res";
import { InsertRes } from "projects/interface/insert-res";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class CommentService{
    constructor(private http:HttpClient){}

    insert(data:any){
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/comments`,data)
    }

    getAllByPost(postId: string, offset:number, limit: number){
        return this.http.get<CommentsRes>(`${BASE_URL.LOCALHOST}/comments/post/${postId}?offset=${offset}&limit=${limit}`)
    }

}