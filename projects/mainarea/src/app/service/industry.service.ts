import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IndustriesRes } from "projects/interface/industry/industries-res";
import { InsertRes } from "projects/interface/insert-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class IndustryService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<IndustriesRes> {
        return this.http.get<IndustriesRes>(`${BASE_URL.LOCALHOST}/industries/active`)
    }
    getAllLimit(offset: number, limit: number): Observable<IndustriesRes> {
        return this.http.get<IndustriesRes>(`${BASE_URL.LOCALHOST}/industries?offset=${offset}&limit=${limit}`)
    }

    insert(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/industries`, data)
    }
}