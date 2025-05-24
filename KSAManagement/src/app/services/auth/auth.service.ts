import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenData:any;
  private apiURL:any = "https://ksaapi.onrender.com/api/Auth/verify-token";
  constructor(private http: HttpClient) { }

  verifyToken(token: string): Observable<any>{
    return this.http.post(this.apiURL, JSON.stringify(token),
    {
    headers: { 'Content-Type': 'application/json' }
    }).pipe(
          tap(response => console.log("Verification API call is Success!", response)),
          catchError(error => {
            console.error('Error:', error);
            throw error;
          })
        );
  }
}
