import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../utils/book.interface';
import { Headers } from './header';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private endpoint = environment.endpoint;
  private httpOptions = {};

  constructor(private http: HttpClient, private header: Headers) {}

  getAllBooks(): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + 'book', this.httpOptions);
  }

  getAllNewBooks(): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + 'book/new', this.httpOptions);
  }

  getLastBooks(): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + 'book/last', this.httpOptions);
  }

  getByCategory(): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + 'book/category', this.httpOptions);
  }

  getBookByCategoryId(id: string): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + `book/category/${id}`, this.httpOptions);
  }

  getBookById(id: string): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.get(this.endpoint + `book/${id}`, this.httpOptions);
  }

  createBook(book: Book): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.post(this.endpoint + 'book/create', book, this.httpOptions);
  }
  
  updateBook(id: string, book: Book): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.put(this.endpoint + `book/${id}`, book, this.httpOptions);
  }

  deleteBook(id: string): Observable<any> {
    this.httpOptions = this.header.getHeader();
    return this.http.delete(this.endpoint + `book/${id}`, this.httpOptions);
  }
}
