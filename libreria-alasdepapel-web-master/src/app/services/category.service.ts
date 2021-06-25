import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private endpoint = environment.endpoint;
  private httpOptions = {};

  constructor(
    private router: Router,
    private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    this.httpOptions = { 'Content-Type': 'application/json' };
    return this.http.get(this.endpoint + 'category/', this.httpOptions);
  }

  getCategoryById(categoryId: string) {
    this.httpOptions = { 'Content-Type': 'application/json' };
    return this.http.get(this.endpoint + `category/${categoryId}`, this.httpOptions);
  }
}
