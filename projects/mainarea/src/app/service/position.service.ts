import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PositionsRes } from "projects/interface/position/positions-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PositionsRes> {
        return this.http.get<PositionsRes>(`${BASE_URL.LOCALHOST}/positions/active`)
    }
}