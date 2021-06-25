import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Book } from 'src/app/utils/book.interface';
import { Category } from 'src/app/utils/category.interface';

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './create-book-dialog.component.html',
  styleUrls: ['./create-book-dialog.component.css']
})
export class CreateBookDialogComponent {
  public formBook: FormGroup;
  public hide = true;
  public categories: Array<Category> = [];
  public createAction = true;
  
  constructor(public dialogRef: MatDialogRef<CreateBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) {
      this.formBook = this.formBuilder.group({
        'title': ['', Validators.compose([Validators.required])],
        'description': ['', Validators.compose([Validators.required])],
        'price': ['', Validators.compose([Validators.required])],
        'image': [''],
        'category': ['', Validators.compose([Validators.required])]
      });

      this.categoryService.getAllCategories().subscribe(res => {
        this.categories = res.categories;
      });

      if (data) {
        this.setBook(data);
        this.createAction = false;
      }
    }

    setBook(book: Book) {
      this.title.setValue(book.title);
      this.description.setValue(book.description);
      this.price.setValue(book.price);
      this.image.setValue(book.image);
      this.category.setValue(book.category);
    }

    create() {
      if (this.formBook.valid) {
        this.dialogRef.close(this.formBook.value)
      } else {
        console.log('LLena todos los campos para continuar');
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    get title() {
      return this.formBook.controls['title'];
    }
    get description() {
      return this.formBook.controls['description'];
    }
    get price() {
      return this.formBook.controls['price'];
    }
    get image() {
      return this.formBook.controls['image'];
    }
    get category() {
      return this.formBook.controls['category'];
    }

}
