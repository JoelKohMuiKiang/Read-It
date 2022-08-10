import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AddBookComponent } from './add-book/add-book.component';
import { DisplayBookComponent } from './display-book/display-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';

import { BooksService } from './books.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { BookDetailsIdComponent } from './book-details-id/book-details-id.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NormalUserComponent } from './normal-user/normal-user.component';
import { RegisteredAuthorComponent } from './registered-author/registered-author.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AddBookComponent,
    DisplayBookComponent,
    UpdateBookComponent,
    DeleteBookComponent,
    SearchComponent,
    ProfileComponent,
    BookDetailsIdComponent,
    AddCommentComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    NormalUserComponent,
    RegisteredAuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    Ng2SearchPipeModule,
    FormsModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
