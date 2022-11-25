import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleRes } from "projects/interface/article/article-res";
import { ArticlesRes } from "projects/interface/article/articles-res";
import { InsertRes } from "projects/interface/insert-res";
import { UpdateRes } from "projects/interface/update-res";
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

    countAllById(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/articles/count-user`)
    }

    getAll(offset: number, limit: number): Observable<ArticlesRes> {
        return this.http.get<ArticlesRes>(`${BASE_URL.LOCALHOST}/articles?offset=${offset}&limit=${limit}`)
    }

    getAllById(offset: number, limit: number): Observable<ArticlesRes> {
        return this.http.get<ArticlesRes>(`${BASE_URL.LOCALHOST}/articles/user?offset=${offset}&limit=${limit}`)
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