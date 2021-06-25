import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { CreateBookDialogComponent } from './components/create-book-dialog/create-book-dialog.component';
import { OneCategoryPageComponent } from './pages/one-category-page/one-category-page.component';
import { ViewBookDialogComponent } from './components/view-book-dialog/view-book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CategoryPageComponent,
    QuestionPageComponent,
    AboutPageComponent,
    AdminPageComponent,
    LoginDialogComponent,
    CreateBookDialogComponent,
    OneCategoryPageComponent,
    ViewBookDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
