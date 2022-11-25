import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResDto } from "projects/interface/login/login-res-dto";

@Injectable({
    providedIn:'root'
})
export class ApiService{
   
    saveData(data: LoginResDto) {
        localStorage.setItem('data', JSON.stringify(data))
    }

    getData(): string | null {
        const data = localStorage.getItem('data')
        let result: null | string = ''
        if (data) {
            result = JSON.parse(data).token
        }
        return result
    }

    getRoleCode(): string | null {
        const data = localStorage.getItem('data')
        let result: null| string = ''
        if (data){
            result = JSON.parse(data).roleCode
        }
        return result
    }
    
    getPhoto(): string | null {
        const data = localStorage.getItem('data')
        let result: null| string = ''
        if (data){
            result = JSON.parse(data).fileId
        }
        return result
    }
    
    getId(): string {
        const data = localStorage.getItem('data')
        let result: string = ''
        if (data){
            result = JSON.parse(data).id
        }
        return result
    }
    
    getFullName(): string | null {
        const data = localStorage.getItem('data')
        let result: null| string = ''
        if (data){
            result = JSON.parse(data).fullname
        }
        return result
    }

    getEmail(): string | null {
        const data = localStorage.getItem('data')
        let result: null| string = ''
        if (data){
            result = JSON.parse(data).email
        }
        return result
    }

    logout(){
        localStorage.clear()
    }
}