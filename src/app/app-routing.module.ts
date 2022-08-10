import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DisplayBookComponent } from './display-book/display-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { ProfileComponent } from './profile/profile.component';
import { BookDetailsIdComponent } from './book-details-id/book-details-id.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { RegisteredAuthorComponent } from './registered-author/registered-author.component';

const routes: Routes = [
  {path: 'nav', component: NavComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'addBook', component: AddBookComponent, canActivate: [AuthGuard], data: {permission: {only: ['author']}}},
  {path: 'displayBook', component: DisplayBookComponent, canActivate: [AuthGuard], data: {permission: {only: ['user', 'author']}}},
  {path: 'updateBook/:id', component: UpdateBookComponent, canActivate: [AuthGuard], data: {permission: {only: ['author']}}},
  {path: 'deleteBook', component: DeleteBookComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'bookDetails/:id', component: BookDetailsIdComponent, canActivate: [AuthGuard], data: {permission: {only: ['user', 'author']}}},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: '', component: DisplayBookComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
