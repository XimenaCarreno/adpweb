import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/utils/book.interface';
import { Category } from 'src/app/utils/category.interface';

@Component({
  selector: 'app-view-book-dialog',
  templateUrl: './view-book-dialog.component.html',
  styleUrls: ['./view-book-dialog.component.css']
})
export class ViewBookDialogComponent {
  public book!: Book;
  public category!: Category;
  constructor(
    public dialogRef: MatDialogRef<ViewBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private categoryService: CategoryService) {
      this.book = data;
      this.categoryService.getCategoryById(data.category).subscribe((res: any) => {
        this.category = res.category;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
