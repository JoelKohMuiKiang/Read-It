import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from '../books';
import { BooksService } from '../books.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Comments } from '../comments';
import { ObjectId } from 'mongodb';

@Component({
  selector: 'app-book-details-id',
  templateUrl: './book-details-id.component.html',
  styleUrls: ['./book-details-id.component.css']
})
export class BookDetailsIdComponent implements OnInit {
  listofBooks: any;
  _id: string

  comment: any = []; 

  constructor(private route: ActivatedRoute, private booksService: BooksService, private fb: FormBuilder) { 
    this.route.params.subscribe(params => {
      this._id = params['id'];

      this.booksService.getBook(this._id).subscribe(value => {
        this.listofBooks = value;
        booksService.listofBooks = value;
      });

      this.booksService.getComments(this._id).subscribe(value => {
        this.comment = value;
      })
    })  
  }

  addComment: FormGroup;

  ngOnInit(): void {
    this.addComment = this.fb.group({
      comment: '',
    })
  }

  onSubmit() {
    this.booksService.addComment(this.addComment.value.comment, sessionStorage.getItem('token'), this._id).subscribe(result => {
      location.reload();
      this.addComment.reset();
    });
  }


  // ngOnInit(): void {
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id'];
  //     const i = this.service.getBooks().findIndex(b => b._id === this.id)
  //     this.book = this.service.getBook(this.id);
  //   })  
  // }



}
