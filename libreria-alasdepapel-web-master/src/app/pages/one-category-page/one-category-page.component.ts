import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ViewBookDialogComponent } from 'src/app/components/view-book-dialog/view-book-dialog.component';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/utils/book.interface';
import { Category } from 'src/app/utils/category.interface';

@Component({
  selector: 'app-one-category-page',
  templateUrl: './one-category-page.component.html',
  styleUrls: ['./one-category-page.component.css']
})
export class OneCategoryPageComponent implements OnInit {
  private categoryId = '';
  public books!: Array<Book>;
  public category!: Category;
  public withoutCategory = false;

  constructor(private activeRouter: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    public dialog: MatDialog) {
    this.activeRouter.params.subscribe( params => {
      if (params.id === 'new') {
        this.withoutCategory = true;
      } else {
        this.categoryId = params.id;
      }
    });
  }

  ngOnInit(): void {
    if (this.withoutCategory) {
      this.getAllBooks();
    } else {
      this.getCategoryById(this.categoryId);
      this.getBooksByCategoryId(this.categoryId);
    }
  }

  viewBook(book: Book) {
    const dialogRef = this.dialog.open(ViewBookDialogComponent, {
      width: '600px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => console.log('Se ha cerrado la modal') );
  }

  private getBooksByCategoryId(categoryId: string) {
    this.bookService.getBookByCategoryId(categoryId).subscribe(res => {
      this.books = res.books;      
    }, error => console.log(error.msg) );
  }

  private getCategoryById(categoryId: string) {
    this.categoryService.getCategoryById(categoryId).subscribe((res: any) => {
      this.category = res.category;
    }, error => console.log(error.msg) );
  }

  private getAllBooks() {
    this.bookService.getAllNewBooks().subscribe(res => {
      this.books = res.books;
    }, error => console.log(error.msg) );
  }

}
