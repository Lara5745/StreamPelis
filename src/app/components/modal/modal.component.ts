import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookInterface } from './../../models/book';
import { DataApiService } from '../../services/data-api.service';
//import { DataApiService } from './../../services/data-api.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  //templateUrl: './modal.component.html', cambio
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose:ElementRef;
  @Input() userUid: string;
  ngOnInit(): void {
  }

  onSaveBook(bookForm:NgForm):void{
    console.log('bookForm.value.id',bookForm.value.id);
    if(bookForm.value.id==null){
      //new
      bookForm.value.userUid = this.userUid;
      this.dataApi.addBook(bookForm.value);
    }else{
      //update
      this.dataApi.updateBook(bookForm.value);
    }
    bookForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
