import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://127.0.0.1:8000';
  constructor(private readonly http: HttpClient) { }

  login(user: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/token/`, user,
    {
      headers: new HttpHeaders().append('content-type', 'application/json'),
      observe: 'response'
    }
    )
  }

  /* register(user:{nom: string, prenom: string, cin: string, email: string, mdp: string}): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/signup`, user ,
    {
      headers: new HttpHeaders().append('content-type', 'application/json'),
      observe: 'response'
    }
    )
  } */
}