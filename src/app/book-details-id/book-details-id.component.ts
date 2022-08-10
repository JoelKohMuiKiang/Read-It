import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from '../books';
import { BooksService } from '../books.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Comments } from '../comments';

@Component({
  selector: 'app-book-details-id',
  templateUrl: './book-details-id.component.html',
  styleUrls: ['./book-details-id.component.css']
})
export class BookDetailsIdComponent implements OnInit {
  listofBooks: Books [] = [];
  

  constructor(private route: ActivatedRoute, private booksService: BooksService, private fb: FormBuilder) { 
    this.booksService.getBooks().subscribe(value => {
      this.listofBooks = value;
      booksService.listofBooks = value;
      console.log(this.listofBooks)
    });
  }

  // ngOnInit(): void {
  //   this.sub = this.route.params.subscribe(params => {
  //     this.id = +params['id'];
  //     // const i = this.service.getBooks().findIndex(b => b._id === this.id)
  //     this.book = this.service.getBook(this.id);
  //   })  
  // }

  ngOnInit(): void {
    
  }



}
