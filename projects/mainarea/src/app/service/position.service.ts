import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { PositionRes } from "projects/interface/position/position-res";
import { PositionsRes } from "projects/interface/position/positions-res";
import { UpdateRes } from "projects/interface/update-res";
import { Observable, of } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PositionsRes> {
        return this.http.get<PositionsRes>(`${BASE_URL.LOCALHOST}/positions/active`)
    }

    getById(id:string): Observable<PositionRes>{
        return this.http.get<PositionRes>(`${BASE_URL.LOCALHOST}/positions/${id}`)
    }

    getAllLimit(offset: number, limit: number): Observable<PositionsRes> {
        return this.http.get<PositionsRes>(`${BASE_URL.LOCALHOST}/positions?offset=${offset}&limit=${limit}`)
    }

    count(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/positions/count`)
    }

    insert(data:any): Observable<InsertRes>{
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/positions`,data)
    }

    update(data:any): Observable<UpdateRes>{
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/positions`,data)
    }
}