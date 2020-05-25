
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService, private storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email:string='';
  public password:string='';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit(): void {
  }

  onUpload(e){
    //console.log('subir',e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL() )).subscribe();
  }

  onAddUser(){
    this.authService.registerUser(this.email,this.password)
    .then((res)=>{
      this.authService.isAuth().subscribe(user=>{
        if(user){
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }) .then(() =>{
            this.router.navigate(['offers']);
          }).catch((error)=>console.log('ERROR',error));
          }
      });
      //this.router.navigate(['admin/list-books']);
    }).catch(err=>alert('Lo siento\nAlguien te gano ese nombre :c\nO quizás tú contraseña tiene menos de 6 dígitos'));//console.log('ERROR',err.message));
  }

  onLoginGoogle():void{
    //this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
    .then((res)=>{
      this.onLoginRedirect();      
    }).catch (err=>console.log('err',err))
  }

  onLoginRedirect(): void{
    this.router.navigate(['admin/login']);
  }

}
