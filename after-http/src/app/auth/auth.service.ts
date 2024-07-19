import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
}

Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }
    
    signUp(email: string, password: string) {
        const body={
            email: email,
            password: password,
            returnSecureToken: true
        }
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuhVBhy00QiP67QHJHvBjUyHGS1 - Pm0ko',body)
    }
}