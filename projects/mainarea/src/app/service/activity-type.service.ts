import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivityTypeRes } from "projects/interface/activity-type/activity-type";
import { ActivityTypesRes } from "projects/interface/activity-type/activity-types-res";
import { Observable, of } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class ActivityTypeService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ActivityTypesRes> {
        return this.http.get<ActivityTypesRes>(`${BASE_URL.LOCALHOST}/activity-types`)
    }

    getById(id: string): Observable<ActivityTypeRes> {
        return this.http.get<ActivityTypeRes>(`${BASE_URL.LOCALHOST}/activity-types/${id}`)
    }
}