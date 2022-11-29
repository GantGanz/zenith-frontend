import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsertRes } from "projects/interface/insert-res";
import { BASE_URL } from "../constant/base.url";

@Injectable({
    providedIn: 'root'
})
export class PollVoteService{
    constructor(private http:HttpClient){}

    insert(data:any){
        return this.http.post<InsertRes>(`${BASE_URL.LOCALHOST}/poll-votes`,data)
    }

    countAllVote(pollId:string){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/poll-votes/count-all-vote/${pollId}`)
    }

    countVote(pollOptionId: string){
        return this.http.get<number>(`${BASE_URL.LOCALHOST}/poll-votes/count-vote/${pollOptionId}`)
    }

    isVoted(pollId: string){
        return this.http.get<boolean>(`${BASE_URL.LOCALHOST}/poll-votes/voted/${pollId}`)
    }
}