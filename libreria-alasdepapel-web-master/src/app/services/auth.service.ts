import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Login {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoint = environment.endpoint;
  private httpOptions = {};

  constructor(
    private router: Router,
    private http: HttpClient) {}

  public async session(): Promise<boolean> {
    const token = localStorage.getItem('token'); 
    if (token) {
      let response = await this.validateSession(token).toPromise();
      return response;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  login(data: Login): Observable<any> {
    this.httpOptions = { 'Content-Type': 'application/json' };
    return this.http.post(this.endpoint + 'user/login', data, this.httpOptions);
  }

  validateSession(token: string): Observable<boolean> {
    this.httpOptions = { 'Content-Type': 'application/json' };
    return token ? this.http.post(this.endpoint + 'user/validate', { token }, this.httpOptions).pipe(
      tap(res => console.log(res)),
      map(
        res => true,
        (error: any) => false
      )
    ) : of(false);
  }
}

