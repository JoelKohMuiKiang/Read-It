import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { Books } from '../books';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  id?: number;

  constructor(private fb: FormBuilder,
    private booksService: BooksService,
    private Router: Router,
    private Route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  createForm: FormGroup;

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ['', Validators.required],
    });
  }
  
  newBook: Books;

  onSubmit(){
    if (this.createForm.valid) {
    // {  this.newBook = new Books();
    //   this.newBook._id = this.createForm.value._id;
    //   this.newBook.name = this.createForm.value.name;
    //   this.newBook.author = this.createForm.value.author;
    //   this.newBook.synopsis = this.createForm.value.synopsis;
    //   this.newBook.comments = [];

    //   console.log(this.newBook.name + " was added.")

    //   this.booksService.addBooks(this.newBook);
    //   this.createForm.reset();
    //   this.Router.navigate(['/displayBook'])
    //   this.snackBar.open(this.newBook.name + ' was added', '', {
    //     duration: 1000
    //   });

    this.booksService.addBooks(this.createForm.value.name, this.createForm.value.author, this.createForm.value.synopsis, sessionStorage.getItem('token')).subscribe(results => {
        location.reload
      })

    this.createForm.reset();
    this.Router.navigate(['/displayBook'])
    this.snackBar.open(this.newBook.name + ' was added', '', {
          duration: 1000
        });
    // } else {
    //   this.createForm.markAllAsTouched();
    //   return;
    }
  }

}
