import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleRes } from "projects/interface/article/article-res";
import { ArticlesRes } from "projects/interface/article/articles-res";
import { InsertRes } from "projects/interface/insert-res";
import { UpdateRes } from "projects/interface/update-res";
import { UserRes } from "projects/interface/user/user-res";
import { UsersRes } from "projects/interface/user/users-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    constructor(private http: HttpClient) { }

    countAll(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/articles/count`)
    }

    getAll(): Observable<ArticlesRes> {
        return this.http.get<ArticlesRes>(`${BASE_URL.LOCALHOST}/articles`)
    }

    getAllById(): Observable<ArticlesRes> {
        return this.http.get<ArticlesRes>(`${BASE_URL.LOCALHOST}/articles/user`)
    }

    insert(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/articles`, data)
    }

    update(data: any): Observable<UpdateRes> {
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/articles`, data)
    }

    getById(id: string): Observable<ArticleRes> {
        return this.http.get<ArticleRes>(`${BASE_URL.LOCALHOST}/articles/${id}`)
    }
}