import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewBookDialogComponent } from 'src/app/components/view-book-dialog/view-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/utils/book.interface';
import { Category } from 'src/app/utils/category.interface';

interface ByCategories {
  category: Category,
  books: Array<Book>
}

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  public bookCategories: Array<ByCategories> = [];
  constructor(private bookService: BookService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.bookService.getByCategory().subscribe(res => {
      this.bookCategories = res.books;      
    }, err => {
      console.log(err.msg);
    })
  }

  viewBook(book: Book) {
    const dialogRef = this.dialog.open(ViewBookDialogComponent, {
      width: '600px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => console.log('Se ha cerrado la modal') );
  }

}
