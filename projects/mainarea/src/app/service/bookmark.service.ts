import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn:'root'
})
export class BookmarkService{
    constructor(private http:HttpClient){}

    insert(data:any){
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/bookmarks`,data)
    }

    delete(bookmarkId:string){
        return this.http.delete<boolean>(`${BASE_URL.LOCALHOST}/bookmarks/${bookmarkId}`)
    }

    getId(postId: string){
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/bookmarks/bookmarked-id/${postId}`)
    }
}