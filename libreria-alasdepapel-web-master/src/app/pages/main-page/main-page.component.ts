import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookDialogComponent } from 'src/app/components/view-book-dialog/view-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/utils/book.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public lastBooks: Array<Book> = [];
  constructor(private bookService: BookService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLastBooks();
  }

  private getLastBooks() {
    this.bookService.getLastBooks().subscribe(res => {
      this.lastBooks = res.books;
    }, err => console.log(err.msg));
  }

  viewBook(book: Book) {
    const dialogRef = this.dialog.open(ViewBookDialogComponent, {
      width: '600px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => console.log('Se ha cerrado la modal') );
  }

}
