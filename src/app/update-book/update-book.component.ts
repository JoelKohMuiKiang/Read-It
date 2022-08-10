import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Books } from '../books';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  listofBooks: Books[] = [];
  id: string;

  constructor(private fb: FormBuilder,
    private booksService: BooksService,
    private Router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  updateForm: FormGroup;  

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ['', Validators.required],
    });
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
  }

  // onSubmit(name: string) {
  //   if (this.updateForm.valid) {
  //     let name = this.updateForm.value.name;
  //     let author = this.updateForm.value.author;
  //     let synopsis = this.updateForm.value.synopsis;

  //     this.booksService.updateBook(this.id, name, author, synopsis);
  //     this.updateForm.reset();
  //     this.Router.navigate(['/displayBook'])
  //     this.snackBar.open(name + ' was edited', '', {
  //       duration: 1000
  //     });
  //   } else {
  //     this.updateForm.markAllAsTouched();
  //     return;
  //   }
  // }

  onSubmit() {
    if (this.updateForm.valid){
      // var name = (document.getElementById(_id+'_name') as HTMLInputElement).value;
      // var author = (document.getElementById(_id+'_author') as HTMLInputElement).value;
      // var synopsis = (document.getElementById(_id+'_synopsis') as HTMLInputElement).value;
      let name = this.updateForm.value.name;
      let author = this.updateForm.value.author;
      let synopsis = this.updateForm.value.synopsis;

      this.booksService.updateBook(this.id, name, author, synopsis).subscribe(results => {
        location.reload();
      })
      this.Router.navigate(['/displayBook'])
      this.snackBar.open(name + ' was updated', '', {
        duration: 1000
      });
    }
  }

}
