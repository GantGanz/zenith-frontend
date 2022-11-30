import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivitiesRes } from "projects/interface/activity/activities-res";
import { ActivityRes } from "projects/interface/activity/activity-res";
import { InsertRes } from "projects/interface/insert-res";
import { UpdateRes } from "projects/interface/update-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    constructor(private http: HttpClient) { }

    countCourse(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/activities/count-my-course`)
    }

    countEvent(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/activities/count-my-event`)
    }

    getAllEvent(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/event?offset=${offset}&limit=${limit}`)
    }

    getAllCourse(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/course?offset=${offset}&limit=${limit}`)
    }

    getAllEventById(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/my-event?offset=${offset}&limit=${limit}`)
    }

    getAllCourseById(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/my-course?offset=${offset}&limit=${limit}`)
    }

    getAllJoinedEventById(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/joined-event?offset=${offset}&limit=${limit}`)
    }

    getAllJoinedCourseById(offset: number, limit: number): Observable<ActivitiesRes> {
        return this.http.get<ActivitiesRes>(`${BASE_URL.LOCALHOST}/activities/joined-course?offset=${offset}&limit=${limit}`)
    }

    insert(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/activities`, data)
    }

    update(data: any): Observable<UpdateRes> {
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/activities`, data)
    }

    getById(id: string): Observable<ActivityRes> {
        return this.http.get<ActivityRes>(`${BASE_URL.LOCALHOST}/activities/${id}`)
    }
}