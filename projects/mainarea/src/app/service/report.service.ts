import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReportsRes } from "projects/interface/report/reports-res";
import { Observable } from "rxjs";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) { }

    countMemberIncome(startDate: string, endDate: string): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/reports/count-member-income?start-date=${startDate}&end-date=${endDate}`)
    }

    getAllMemberIncome(startDate: string, endDate: string, offset: number, limit: number): Observable<ReportsRes> {
        return this.http.get<ReportsRes>(`${BASE_URL.LOCALHOST}/reports/member-income?start-date=${startDate}&end-date=${endDate}&offset=${offset}&limit=${limit}`)
    }

    reportMemberIncome(startDate: string, endDate: string): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/reports/report-member-income?start-date=${startDate}&end-date=${endDate}`, { responseType: 'blob' as 'json', observe: 'response' })
    }

    countSuperAdminIncome(startDate: string, endDate: string): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/reports/count-superadmin-income?start-date=${startDate}&end-date=${endDate}`)
    }

    getAllSuperAdminIncome(startDate: string, endDate: string, offset: number, limit: number): Observable<ReportsRes> {
        return this.http.get<ReportsRes>(`${BASE_URL.LOCALHOST}/reports/superadmin-income?start-date=${startDate}&end-date=${endDate}&offset=${offset}&limit=${limit}`)
    }

    reportSuperAdminIncome(startDate: string, endDate: string): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/reports/report-superadmin-income?start-date=${startDate}&end-date=${endDate}`, { responseType: 'blob' as 'json', observe: 'response' })
    }

    countActivityMember(startDate: string, endDate: string): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/reports/count-activity-member?start-date=${startDate}&end-date=${endDate}`)
    }

    getAllActivityMember(startDate: string, endDate: string, offset: number, limit: number): Observable<ReportsRes> {
        return this.http.get<ReportsRes>(`${BASE_URL.LOCALHOST}/reports/activity-member?start-date=${startDate}&end-date=${endDate}&offset=${offset}&limit=${limit}`)
    }

    reportActivityMember(startDate: string, endDate: string): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/reports/report-activity-member?start-date=${startDate}&end-date=${endDate}`, { responseType: 'blob' as 'json', observe: 'response' })
    }

    countActivitySuperAdmin(startDate: string, endDate: string): Observable<number> {
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/reports/count-activity-superadmin?start-date=${startDate}&end-date=${endDate}`)
    }

    getAllActivitySuperAdmin(startDate: string, endDate: string, offset: number, limit: number): Observable<ReportsRes> {
        return this.http.get<ReportsRes>(`${BASE_URL.LOCALHOST}/reports/activity-superadmin?start-date=${startDate}&end-date=${endDate}&offset=${offset}&limit=${limit}`)
    }

    reportActivitySuperAdmin(startDate: string, endDate: string): Observable<any> {
        return this.http.get<any>(`${BASE_URL.LOCALHOST}/reports/report-activity-superadmin?start-date=${startDate}&end-date=${endDate}`, { responseType: 'blob' as 'json', observe: 'response' })
    }
}