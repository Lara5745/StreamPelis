import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router:Router,private authService: AuthService) { }
  public email: string = '';
  public password: string = '';
  ngOnInit(): void {
  }

  onLogin():void{
    //console.log ('email',this.email);
    //console.log ('pasword',this.password);
    this.authService.loginEmailUser(this.email,this.password)
    .then ((res)=>{
      this.onLoginRedirect();
    }).catch(err=>alert('Datos Incorrectos\nVuelve a intentarlo'));//console.log('ERR',err.message)); cambio
  }

  onLoginGoogle():void{
    //this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }

  onLogout(){
    this.authService.logoutUser();
  }

  onLoginRedirect(): void{
    this.router.navigate(['offers']);
  }

}
