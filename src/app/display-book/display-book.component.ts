import { Component, OnInit } from '@angular/core';

import { BooksService } from '../books.service';
import { Books } from '../books';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})

export class DisplayBookComponent implements OnInit {

  listofBooks: Books[] = [];
  // constructor(private booksService: BooksService, private router: Router, private dialog: MatDialog) { 
  //   this.listofBooks = this.booksService.getBooks();
  // }

  constructor(private booksService: BooksService, private router: Router, private dialog: MatDialog, private authenticationService : AuthenticationService) {
    this.booksService.getBooks().subscribe(value => {
      this.listofBooks = value;
      booksService.listofBooks = value;
      console.log(this.listofBooks)
    });
  }

  ngOnInit(): void {
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    //console.log(this.searchText);
  }

  updateBook(_id: number) {
    this.router.navigate(['/updateBook', _id])
  }

  // deleteBook(id: number) {
  //   if (confirm('Are you sure about that?')) {
  //     this.booksService.deleteBook(id);
  //   }
  // }

  //deleteBooks(id) function to invoke the injected BooksService's deleteBook() function and parsing in the id parameter into the function
  deleteBook(_id: number) {
    
    // console.log(this.authenticationService.isAuthor());
    
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isAuthor())
    {this.booksService.deleteBook(_id).subscribe(results => {
      location.reload();
    })}
    return false
  }
}
