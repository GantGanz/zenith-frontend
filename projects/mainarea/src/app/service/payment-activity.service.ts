import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { PaymentActivitiesRes } from "projects/interface/payment-activity/payment-activities-res";
import { PaymentActivityRes } from "projects/interface/payment-activity/payment-activity-res";
import { UpdateRes } from "projects/interface/update-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: "root"
})
export class PaymentActivityService {
    constructor(private http: HttpClient) { }

    checkApproved(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${BASE_URL.LOCALHOST}/payment-activities/status/${id}`)
    }

    checkPaid(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${BASE_URL.LOCALHOST}/payment-activities/paid/${id}`)
    }

    countAllUnapproved(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-activities/count`)
    }

    countAllApproved(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-activities/count-approved`)
    }

    countAllRejected(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-activities/count-rejected`)
    }

    getCreatorIncome(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-activities/creator-income`)
    }

    getSystemIncome(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-activities/system-income`)
    }

    getAllApproved(offset: number, limit: number): Observable<PaymentActivitiesRes> {
        return this.http.get<PaymentActivitiesRes>(`${BASE_URL.LOCALHOST}/payment-activities/approved?offset=${offset}&limit=${limit}`)
    }

    getAllUnapproved(offset: number, limit: number): Observable<PaymentActivitiesRes> {
        return this.http.get<PaymentActivitiesRes>(`${BASE_URL.LOCALHOST}/payment-activities/unapproved?offset=${offset}&limit=${limit}`)
    }

    getAllRejected(offset: number, limit: number): Observable<PaymentActivitiesRes> {
        return this.http.get<PaymentActivitiesRes>(`${BASE_URL.LOCALHOST}/payment-activities/rejected?offset=${offset}&limit=${limit}`)
    }

    getAllByCreatorId(): Observable<PaymentActivitiesRes> {
        return this.http.get<PaymentActivitiesRes>(`${BASE_URL.LOCALHOST}/payment-activities/user`)
    }

    getAllByMemberId(offset: number, limit: number): Observable<PaymentActivitiesRes> {
        return this.http.get<PaymentActivitiesRes>(`${BASE_URL.LOCALHOST}/payment-activities/member?offset=${offset}&limit=${limit}`)
    }

    insert(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/payment-activities`, data)
    }

    approve(data: any): Observable<UpdateRes> {
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/payment-activities`, data)
    }

    reject(data: any): Observable<UpdateRes> {
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/payment-activities/reject`, data)
    }

    getById(id: string): Observable<PaymentActivityRes> {
        return this.http.get<PaymentActivityRes>(`${BASE_URL.LOCALHOST}/payment-activities/${id}`)
    }
}