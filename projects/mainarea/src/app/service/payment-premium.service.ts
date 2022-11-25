import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { PaymentPremiumRes } from "projects/interface/payment-premium/payment-premium-res";
import { PaymentPremiumsRes } from "projects/interface/payment-premium/payment-premiums-res";
import { UpdateRes } from "projects/interface/update-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: "root"
})
export class PaymentPremiumService {
    constructor(private http: HttpClient) { }

    countAllUnapproved(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-premiums/count`)
    }

    countAllApproved(): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/payment-premiums/count-approved`)
    }

    getAllApproved(offset: number, limit: number): Observable<PaymentPremiumsRes> {
        return this.http.get<PaymentPremiumsRes>(`${BASE_URL.LOCALHOST}/payment-premiums/approved?offset=${offset}&limit=${limit}`)
    }

    getAllUnapproved(offset: number, limit: number): Observable<PaymentPremiumsRes> {
        return this.http.get<PaymentPremiumsRes>(`${BASE_URL.LOCALHOST}/payment-premiums/unapproved?offset=${offset}&limit=${limit}`)
    }

    insert(data: any): Observable<InsertRes> {
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/payment-premiums`, data)
    }

    approve(data: any): Observable<UpdateRes> {
        return this.http.put<UpdateRes>(`${BASE_URL.LOCALHOST}/payment-premiums`, data)
    }

    getById(id: string): Observable<PaymentPremiumRes> {
        return this.http.get<PaymentPremiumRes>(`${BASE_URL.LOCALHOST}/payment-premiums/${id}`)
    }
}