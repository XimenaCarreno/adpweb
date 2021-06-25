import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OneCategoryPageComponent } from './pages/one-category-page/one-category-page.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: MainPageComponent
  },
  {
    path: 'categorias/:id',
    component: OneCategoryPageComponent
  },
  {
    path: 'categorias',
    component: CategoryPageComponent
  },
  {
    path: 'preguntas',
    component: QuestionPageComponent
  },
  {
    path: 'acerca',
    component: AboutPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
