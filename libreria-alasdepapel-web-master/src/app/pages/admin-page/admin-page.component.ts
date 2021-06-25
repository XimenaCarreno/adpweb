import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CreateBookDialogComponent } from 'src/app/components/create-book-dialog/create-book-dialog.component';
import { ViewBookDialogComponent } from 'src/app/components/view-book-dialog/view-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { Book, BookCategory } from 'src/app/utils/book.interface';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public search: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('matPaginatorBooks') paginatorBooks!: MatPaginator;
  public displayedColumnsBooks: string[];
  public displayedColumnsBooksName: string[];
  public dataSourceBooks!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private bookService: BookService) {
    this.displayedColumnsBooks = ['position', 'title', 'price', 'category', 'actions'];
    this.displayedColumnsBooksName = ['No.', 'Titulo', 'Precio', 'Categoria'];
  }

  ngOnInit(): void {
    this._getAllBooks();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBooks.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceBooks.paginator) {
      this.dataSourceBooks.paginator.firstPage();
    }
  }


  createBook() {
    const dialogRef = this.dialog.open(CreateBookDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: Book) => {
      if (
        result.hasOwnProperty('title') &&
        result.hasOwnProperty('description') &&
        result.hasOwnProperty('price') &&
        result.hasOwnProperty('category')
          ) {
        if(result.image === '') {
          result.image = 'assets/not-available.jpeg'
        }
        this.bookService.createBook(result).subscribe(res => {
          console.log(res.msg);
          this.refreshBooks();
        }, err => {
          console.log(err.msg);
        });
      }
    });
  }

  _getAllBooks() {
    this.bookService.getAllBooks().subscribe( res => {
      const books = res.books.map(this._castToTableBooks);
      this._refreshBooks(books);
    }, () => {
        console.log('Ha sucedido un error en la descarga de la información');
    });
  }

  updateBookDialog(id: string) {
    console.log(id);
    this.bookService.getBookById(id).subscribe(res => {
      const dialogRef = this.dialog.open(CreateBookDialogComponent, {
        width: '600px',
        data: res.book
      });
  
      dialogRef.afterClosed().subscribe((result: Book) => {
        if (
          result.hasOwnProperty('title') &&
          result.hasOwnProperty('description') &&
          result.hasOwnProperty('price') &&
          result.hasOwnProperty('category')
            ) {
          this.bookService.updateBook(id, result).subscribe(res => {
            console.log(res.msg);
            this.refreshBooks();
          }, err => {
            console.log(err.msg);
          });
        }
      });
    }, err => console.log(err.msg));
  }

  viewBook(id: string) {
    this.bookService.getBookById(id).subscribe(res => {
      console.log(res);
      
      const dialogRef = this.dialog.open(ViewBookDialogComponent, {
        width: '600px',
        data: res.book
      });
  
      dialogRef.afterClosed().subscribe(() => console.log('Se ha cerrado la modal') );
    });
  }

  removeBook(id: string) {
    this.bookService.deleteBook(id).subscribe(res => {
      console.log(res.msg);
      this.refreshBooks();
    }, err => console.log(err.msg));
  }

  updateBook(id: string, book: Book) {
    this.bookService.updateBook(id, book).subscribe(res => {
      console.log(res.msg);
      this.refreshBooks();
    }, err => console.log(err.msg));
  }

  public refreshBooks() {
    this._getAllBooks();
  }

  private _refreshBooks(data: Array<any>): void {
    this.dataSourceBooks = new MatTableDataSource(data);
    this.dataSourceBooks.paginator = this.paginatorBooks;
    this.dataSourceBooks.sort = this.sort;
  }

  _castToTableBooks(data: BookCategory, index: number) {
    return {
      _id: data._id,
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      category: data.category,
      position: index + 1
    };
  }
}
