import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { BookInterface } from '../../../models/book';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(public dataApi: DataApiService, private authService: AuthService) { }
  //private books: BookInterface[]; cambio
  public books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit(): void {
    this.getListBooks();
    this.getCurrenUser();
  }

  getCurrenUser(){
    this.authService.isAuth().subscribe(auth=>{
      if(auth){
        this.userUid=auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
          this.isAdmin=Object.assign({},userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  getListBooks(){
    this.dataApi.getAllBooks().subscribe(books=>{
      this.books=books;
    });
  }

  onDeleteBook(idBook:string):void{
    console.log('DELETE BOOK', idBook);
    const confirmacion=confirm('Estas seguro de querer eliminar esta película');
    if(confirmacion){
    this.dataApi.deleteBook(idBook);
    }
  }

  onPreUpdateBook(book:BookInterface){
    console.log('BOOK',book);
    this.dataApi.selectedBook=Object.assign({},book);
  }

  

}
