import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://127.0.0.1:8000';

  constructor(private readonly http: HttpClient) { }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/token/`, user, {
      headers: new HttpHeaders().append('content-type', 'application/json'),
      observe: 'response'
    }).pipe(
      map(response => {
        const user_id = response.body.user_id; // Assuming the server sends the user_id in the response
        if (user_id) {
          localStorage.setItem('user_id', user_id);
        }
        return response;
      })
    );
  }
}


  /* register(user:{nom: string, prenom: string, cin: string, email: string, mdp: string}): Observable<any>{
    return this.http.post<any>(`${this.baseURL}/signup`, user ,
    {
      headers: new HttpHeaders().append('content-type', 'application/json'),
      observe: 'response'
    }
    )
  } */
