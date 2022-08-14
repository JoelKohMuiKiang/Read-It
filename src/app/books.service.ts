import { Injectable } from "@angular/core";
import { Books } from "./books";
import { Comments } from "./comments";
import { listofBooks } from "./mock-books";
import { HttpClient } from '@angular/common/http';
import { ObjectId } from "mongodb";

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    listofBooks: Books[] = [];
    url:string = "http://localhost:3000/api/books";
    urlComment: string = "http://localhost:3000/api/comments";

    constructor(private http:HttpClient) {}

    getBooks() {
        return this.http.get<Books[]>(this.url)
    }

    addBooks(name: string, author: string, synopsis: string, token: string) {
        return this.http.post<Books[]>(this.url, {'name': name, 'author': author, 'synopsis': synopsis, 'token': token})
    }

    //perform HTTP get request to /api/books/_id
    getBook (_id: string) {
        return this.http.get<any[]>(this.url + '/' + _id);
    }

    // perform HTTP put request to /api/books/_id
    updateBook (_id: string, name: string, author: string, synopsis: string, token: string) {
        return this.http.put<Books[]>(this.url + '/' + _id, {'name': name, 'author': author, 'synopsis': synopsis, 'token': token})
    }

    //perform HTTP delete request to /api/books
    deleteBook(_id: number, token: string) {
        return this.http.delete<Books[]> (this.url + '/' + _id + '/' + token);
    }

    // perfrom HTTP post request to /apip/comments
    addComment(comment: string, token: string, bookId: string) {
        return this.http.post<Comments[]> (this.urlComment, {'comment': comment, 'token': token, 'bookId': bookId})
    }

    getComments(bookId: string) {
        return this.http.get<any[]>(this.urlComment + '/' + bookId);
    }

    // getBooks(): Books[]{
    //     return listofBooks;
    // }

    // addBooks(item: Books): void{
    //     listofBooks.push(item);
    // }

    // getBook(_id: ObjectId) {
    //     return this.http.get<Books>(this.url)
    // }

    // updateBook (id:number, name: string, author: string, synopsis: string) {
    //     const i = listofBooks.findIndex(b => b._id === id)
    //     listofBooks[i].name = name
    //     listofBooks[i].author = author
    //     listofBooks[i].synopsis = synopsis
    // }

    // deleteBook(id: number){
    //     const i = listofBooks.findIndex(b => b._id === id)
    //     console.log(i)
    //     if(i !== -1) {
    //         listofBooks.splice(i, 1);
    //     }
    // }

    // addComments(_id: number, comment: string): void{
        //     const i = listofBooks.findIndex(b => b._id === id)
        //     listofBooks[i].comments.push(item);
        // }
}