import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommentRes } from "projects/interface/comment/comment-res";
import { CommentsRes } from "projects/interface/comment/comments-res";
import { InsertRes } from "projects/interface/insert-res";
import { UpdateRes } from "projects/interface/update-res";
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

    countComment(postId:string){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/comments/count-comment/${postId}`)
    }

    updateComment(data:any){
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/comments`,data)
    }

    deleteComment(data:any){
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/comments/soft-delete`,data)
    }

    getByIdComment(id:string){
        return this.http.get<CommentRes>(`${BASE_URL.LOCALHOST}/comments/${id}`)
    }

}